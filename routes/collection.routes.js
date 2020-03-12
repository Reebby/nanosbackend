const express = require('express');
const collectionCtrl = require('../controllers/collection.controller');

const router = express.Router();

router.route('/api/campaigns/:campaignID').get(collectionCtrl.fetchCampaignsByID);

router.route('/api/campaigns/status/:status').get(collectionCtrl.fetchCampaignsByStatus);

router.route('/api/campaign/adgroups/:campaignID').get(collectionCtrl.fetchAdGroupsByCampaignID);

router.route('/api/campaign/ads/:campaignID').get(collectionCtrl.fetchAdsByCampaignID);

router.route('/api/ads/:adID/:startdate/:enddate').get(collectionCtrl.fetchAdStatsByDateRange);

router.route('/api/update/campaign/:campaignID').put(collectionCtrl.updateCampaign);

router.route('/api/update/adgroup/:adGroupID').put(collectionCtrl.updateAdGroup);

router.route('/api/update/ad/:adID').put(collectionCtrl.updateAd);

module.exports = router;

