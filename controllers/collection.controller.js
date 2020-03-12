const mongo = require('mongodb').MongoClient;
const config = require('../config/config');

const fetchCampaignsByID = (req, res) => {
	mongo.connect(config.mongoUri, (err, client) => {
		if (err) {
			console.error(err);
			return;
		}
		let collection = client.db('nanosbackend').collection('data_campaigns');

		collection.find({ id: req.params.campaignID }).toArray((err, campaigns) => {
			if (err || campaigns.length == 0)
				return res.status('400').json({
					error: 'Campaign not found',
				});

			res.status('200').json({ data: campaigns, message: 'Successfully Fetched Campaign By Id' });
		});
	});
};

const fetchCampaignsByStatus = (req, res) => {
	mongo.connect(config.mongoUri, (err, client) => {
		if (err) {
			console.error(err);
			return;
		}
		let collection = client.db('nanosbackend').collection('data_campaigns');

		collection.find({ status: req.params.status }).toArray((err, campaigns) => {
			if (err || campaigns.length == 0)
				return res.status('400').json({
					error: 'Campaign not found',
				});

			res.status('200').json({ data: campaigns, message: 'Successfully Fetched Campaign By Status' });
		});
	});
};

const fetchAdGroupsByCampaignID = (req, res) => {
	mongo.connect(config.mongoUri, (err, client) => {
		if (err) {
			console.error(err);
			return;
		}
		let collection = client.db('nanosbackend').collection('data_adgroups');

		collection.find({ campaign_id: req.params.campaignID }).toArray((err, adgroups) => {
			if (err || adgroups.length == 0)
				return res.status('400').json({
					error: 'AdGroups not found',
				});

			res.status('200').json({ data: adgroups, message: 'Successfully Fetched Ad Groups By Campaign ID' });
		});
	});
};

const fetchAdsByCampaignID = async (req, res) => {
	let ads = [];
	await mongo.connect(config.mongoUri, (err, client) => {
		if (err) {
			console.error(err);
			return;
		}

		let collection = client.db('nanosbackend').collection('data_adgroups');
		let collection2 = client.db('nanosbackend').collection('data_ads');

		//  collection.find({ campaign_id: req.params.campaignID }).toArray((err, adgroups) => {
		// 	let test = adgroups.filter(function(obj1) {
		// 		collection2.find({
		// 			ad_group_id:
		// 				obj1.id /*if you know some properties, you can put them here...if don't, leave this empty*/,
		// 		},(err, data) => data);
		// 	})

		// });

		collection.find({ campaign_id: req.params.campaignID }).forEach(function(obj1) {
			collection2
				.find({
					ad_group_id:
						obj1.id /*if you know some properties, you can put them here...if don't, leave this empty*/,
				})
				.forEach(function(obj2) {
					ads.push(obj2);
					// res.send(obj2)
					// console.log(ads)

					// var equals = function(o1, o2) {
					//     // here goes some compare code...modified from the SO link you have in the answer.
					//     console.log(o2);
					// };

					// if (equals(obj1, obj2)) {
					//     // Do what you want to do
					//     console.log(obj1);
					// }
				});
			//.toArray((err, hjk) => {
			//     res.json(hjk)
			// })
		});

		// collection.find({ campaign_id: req.params.campaignID }).toArray((err, adgroups) => {
		//     if (err || !adgroups)
		//       return res.status('400').json({
		//        error: "Campaign not found"
		//     })

		// res.status('200').json(adgroups)

		// });
	});
	console.log(ads);
};

const fetchAdStatsByDateRange = (req, res) => {
	mongo.connect(config.mongoUri, (err, client) => {
		if (err) {
			console.error(err);
			return;
		}
		let collection = client.db('nanosbackend').collection('data_stats');
		collection
			.find({
				$and: [{ ad_id: req.params.adID }, { date: { $gte: req.params.startdate, $lte: req.params.enddate } }],
			})
			.sort({ date: -1 })
			.toArray((err, adStats) => {
				if (err || adStats.length == 0)
					return res.status(400).json({
						error: 'Ads Stats not found',
					});
					adStats.forEach(function(ad) {
					ad['cost_per_click'] = (ad.cost / ad.clicks).toFixed(1);
				});
				res.status(200).json({ data: adStats, message: 'Successfully Fetched AdStats by date range' });
			});
	});
};

const updateCampaign = (req, res) => {
	mongo.connect(config.mongoUri, (err, client) => {
		if (err) {
			console.error(err);
			return;
		}

		let collection = client.db('nanosbackend').collection('data_campaigns');
		collection
			.updateOne(
				{ id: req.params.campaignID }, // Filter
				{ $set: req.body } // Update
			)
			.then(obj => {
				res.status(200).json({
					message: 'Campaign updated successfully',
				});
			})
			.catch(err => {
				return res.status(400).json({
					error: 'Campaign not updated successfully',
				});
			});
	});
};

const updateAdGroup = (req, res) => {
	mongo.connect(config.mongoUri, (err, client) => {
		if (err) {
			console.error(err);
			return;
		}
		let collection = client.db('nanosbackend').collection('data_adgroups');
		collection
			.updateOne(
				{ id: req.params.adGroupID }, // Filter
				{ $set: req.body } // Update
			)
			.then(obj => {
				res.status(200).json({
					mssg: 'AdGroup updated successfully',
				});
			})
			.catch(err => {
				return res.status(400).json({
					error: 'AdGroup not updated successfully',
				});
			});
	});
};

const updateAd = (req, res) => {
	mongo.connect(config.mongoUri, (err, client) => {
		if (err) {
			console.error(err);
			return;
		}
		let collection = client.db('nanosbackend').collection('data_ads');
		collection
			.updateOne(
				{ id: req.params.adID }, // Filter
				{ $set: req.body } // Update
			)
			.then(obj => {
				res.status('200').json({
					mssg: 'Ad updated successfully',
				});
			})
			.catch(err => {
				return res.status('400').json({
					error: 'Ad not found',
				});
			});
	});
};

module.exports = {
	fetchCampaignsByID,
	fetchCampaignsByStatus,
	fetchAdGroupsByCampaignID,
	fetchAdsByCampaignID,
	fetchAdStatsByDateRange,
	updateCampaign,
	updateAdGroup,
	updateAd,
};
