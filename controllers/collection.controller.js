const mongo = require("mongodb").MongoClient;
const config = require("../config/config");

const fetchCampaignsByID = (req, res) => {
  mongo.connect(config.mongoUri, (err, client) => {
    if (err) {
      res.status("404").json({
        error: "Unable to connect to the database"
      });
      return;
    }
    let collection = client.db(config.db).collection("data_campaigns");

    collection.find({ id: req.params.campaignID }).toArray((err, campaigns) => {
      if (err || campaigns.length == 0)
        return res.status("400").json({
          error: "Campaign not found"
        });

      res
        .status("200")
        .json({
          data: campaigns[0],
          message: "Successfully Fetched Campaign By Id"
        });
    });
  });
};

const fetchCampaignsByStatus = (req, res) => {
  mongo.connect(config.mongoUri, (err, client) => {
    if (err) {
      res.status("404").json({
        error: "Unable to connect to the database"
      });
      return;
    }
    let collection = client.db(config.db).collection("data_campaigns");

    collection.find({ status: req.params.status }).toArray((err, campaigns) => {
      if (err || campaigns.length == 0)
        return res.status("400").json({
          error: "Campaign not found"
        });

      res
        .status("200")
        .json({
          data: campaigns,
          message: "Successfully Fetched Campaign By Status"
        });
    });
  });
};

const fetchAdGroupsByCampaignID = (req, res) => {
  mongo.connect(config.mongoUri, (err, client) => {
    if (err) {
      res.status("404").json({
        error: "Unable to connect to the database"
      });
      return;
    }
    let collection = client.db(config.db).collection("data_adgroups");

    collection
      .find({ campaign_id: req.params.campaignID })
      .toArray((err, adgroups) => {
        if (err || adgroups.length == 0)
          return res.status("400").json({
            error: "AdGroups not found"
          });

        res
          .status("200")
          .json({
            data: adgroups,
            message: "Successfully Fetched Ad Groups By Campaign ID"
          });
      });
  });
};

async function fetchAdsByCampaignID(req, res) {
  let ads = [];

  const client = await mongo
    .connect(config.mongoUri, { useNewUrlParser: true })
    .catch(err => {
      res.status("404").json({
        error: "Unable to connect to the database"
      });
    });

  if (!client) {
    return;
  }

  try {
    let collection = client.db(config.db).collection("data_adgroups");
    let collection2 = client.db(config.db).collection("data_ads");

    let res = await collection
      .find({ campaign_id: req.params.campaignID })
      .toArray();

    for (const file of res) {
      const contents = await collection2
        .find({ ad_group_id: file.id })
        .toArray();
      ads = contents;
    }
  } catch (err) {
    res.status("404").json({
      error: "Ads not found"
    });
  } finally {
    if (ads.length == 0) {
      res.status("400").json({
        error: "Ads not found"
      });
    } else {
      res
        .status(200)
        .json({
          data: ads,
          message: "Successfully Fetched Ads by campaign Id"
        });
    }
    client.close();
  }
}

const fetchAdStatsByDateRange = (req, res) => {
  mongo.connect(config.mongoUri, (err, client) => {
    if (err) {
      res.status("404").json({
        error: "Unable to connect to the database"
      });
      return;
    }
    let collection = client.db(config.db).collection("data_stats");
    collection
      .find({
        $and: [
          { ad_id: req.params.adID },
          { date: { $gte: req.params.startdate, $lte: req.params.enddate } }
        ]
      })
      .sort({ date: -1 })
      .toArray((err, adStats) => {
        if (err || adStats.length == 0)
          return res.status(400).json({
            error: "Ads Stats not found"
          });
        adStats.forEach(function(ad) {
          ad["cost_per_click"] = (ad.cost / ad.clicks).toFixed(1);
        });
        res
          .status(200)
          .json({
            data: adStats,
            message: "Successfully Fetched AdStats by date range"
          });
      });
  });
};

const updateCampaign = (req, res) => {
  mongo.connect(config.mongoUri, (err, client) => {
    if (err) {
      res.status("404").json({
        error: "Unable to connect to the database"
      });
      return;
    }

    let collection = client.db(config.db).collection("data_campaigns");
    collection.findOneAndUpdate(
      { id: req.params.campaignID }, // Filter
      { $set: req.body },
      { returnOriginal: false },
      (err, campaign) => {
        if (err || campaign.length == 0)
          return res.status("400").json({
            error: "Campaign not updated successfully"
          });
        res
          .status("200")
          .json({
            data: campaign.value,
            message: "Campaign updated successfully"
          });
      }
    );
  });
};

const updateAdGroup = (req, res) => {
  mongo.connect(config.mongoUri, (err, client) => {
    if (err) {
      res.status("404").json({
        error: "Unable to connect to the database"
      });
      return;
    }
    let collection = client.db(config.db).collection("data_adgroups");
    collection.findOneAndUpdate(
      { id: req.params.adGroupID },
      { $set: req.body },
      { returnOriginal: false },
      (err, adgroup) => {
        if (err || adgroup.length == 0)
          return res.status("400").json({
            error: "AdGroup not updated successfully"
          });
        res
          .status("200")
          .json({
            data: adgroup.value,
            message: "AdGroup updated successfully"
          });
      }
    );
  });
};

const updateAd = (req, res) => {
  mongo.connect(config.mongoUri, (err, client) => {
    if (err) {
      res.status("404").json({
        error: "Unable to connect to the database"
      });
      return;
    }
    let collection = client.db(config.db).collection("data_ads");
    collection.updateOne(
      { id: req.params.adID },
      { $set: req.body },
      { returnOriginal: false },
      (err, ad) => {
        if (err || ad.length == 0)
          return res.status("400").json({
            error: "Ad not updated successfully"
          });
        res
          .status("200")
          .json({ data: ad.value, message: "Ad updated successfully" });
      }
    );
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
  updateAd
};
