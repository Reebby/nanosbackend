const express = require('express');
const collectionCtrl = require('../controllers/collection.controller');

const router = express.Router();

/**
 * @swagger
 * /api/campaigns/:campaignID:
 *   get:
 *     description: This api end point fetches a campaign by the provided campaignID.
 *     responses:
 *       200:
 *         description: Receive back flavor and flavor Id.
 */

router.route('/api/campaigns/:campaignID').get(collectionCtrl.fetchCampaignsByID);

/**
 * @swagger
 * /api/campaigns/status/:status:
 *   get:
 *     description: This api end point fetches a campaign by the provided campaignID.
 *     responses:
 *       200:
 *         description: Receive back flavor and flavor Id.
 */

router.route('/api/campaigns/status/:status').get(collectionCtrl.fetchCampaignsByStatus);

/**
 * @swagger
 * /api/campaign/adgroups/:campaignID:
 *   get:
 *     description: This api end point fetches a campaign by the provided campaignID.
 *     responses:
 *       200:
 *         description: Receive back flavor and flavor Id.
 */

router.route('/api/campaign/adgroups/:campaignID').get(collectionCtrl.fetchAdGroupsByCampaignID);

/**
 * @swagger
 * /api/campaign/ads/:campaignID:
 *   get:
 *     description: This api end point fetches a campaign by the provided campaignID.
 *     responses:
 *       200:
 *         description: Receive back flavor and flavor Id.
 */

router.route('/api/campaign/ads/:campaignID').get(collectionCtrl.fetchAdsByCampaignID);

/**
 * @swagger
 * /api/ads/:adID/:startdate/:enddate:
 *   get:
 *     description: This api end point fetches a campaign by the provided campaignID.
 *     responses:
 *       200:
 *         description: Receive back flavor and flavor Id.
 */

router.route('/api/ads/:adID/:startdate/:enddate').get(collectionCtrl.fetchAdStatsByDateRange);

/**
 * @swagger
 * /api/update/campaign/:campaignID:
 *   put:
 *     description: This api end point fetches a campaign by the provided campaignID.
 *     responses:
 *       200:
 *         description: Receive back flavor and flavor Id.
 */

router.route('/api/update/campaign/:campaignID').put(collectionCtrl.updateCampaign);

/**
 * @swagger
 * /api/update/adgroup/:adGroupID:
 *   put:
 *     description: This api end point fetches a campaign by the provided campaignID.
 *     responses:
 *       200:
 *         description: Receive back flavor and flavor Id.
 */

router.route('/api/update/adgroup/:adGroupID').put(collectionCtrl.updateAdGroup);

/**
 * @swagger
 * /api/update/ad/:adID:
 *   put:
 *     description: This api end point fetches a campaign by the provided campaignID.
 *     responses:
 *       200:
 *         description: Receive back flavor and flavor Id.
 */

router.route('/api/update/ad/:adID').put(collectionCtrl.updateAd);

module.exports = router;
