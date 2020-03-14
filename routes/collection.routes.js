const express = require("express");
const collectionCtrl = require("../controllers/collection.controller");

const router = express.Router();

/**
 * @swagger
 * /api/campaign/:campaignID:
 *   get:
 *     summary: Fetch campaign by campaign Id
 *     description: This api end point fetches a campaign by the provided campaignID.
 *     responses:
 *       200:
 *         description: Receive back an object of data and message.
 */

router
  .route("/api/campaign/:campaignID")
  .get(collectionCtrl.fetchCampaignsByID);

/**
 * @swagger
 * /api/campaign/status/:status:
 *   get:
 *     summary: Fetch campaign by status
 *     description: This api end point fetches campaigns by the provided status e.g "Pending", "Rejected", "Delivering".
 *     responses:
 *       200:
 *         description: Receive back an array of object of campaigns.
 */

router
  .route("/api/campaign/status/:status")
  .get(collectionCtrl.fetchCampaignsByStatus);

/**
 * @swagger
 * /api/campaign/adgroups/:campaignID:
 *   get:
 *     summary: Fetch ad groups by campaign Id
 *     description: This api end point fetches ad groups of a particular campaign using the provided campaignID.
 *     responses:
 *       200:
 *         description: Receive back an array of object of campaigns.
 */

router
  .route("/api/campaign/adgroups/:campaignID")
  .get(collectionCtrl.fetchAdGroupsByCampaignID);

/**
 * @swagger
 * /api/campaign/ads/:campaignID:
 *   get:
 *     summary: Fetch ads by campaign Id
 *     description: This api end point fetches ads of a particular campaign by the provided campaignID.
 *     responses:
 *       200:
 *         description: Receive back an array of object of ads.
 */

router
  .route("/api/campaign/ads/:campaignID")
  .get(collectionCtrl.fetchAdsByCampaignID);

/**
 * @swagger
 * /api/adstats/:adID/:startdate/:enddate:
 *   get:
 *     summary: Fetch statistics of ads using date range
 *     description: This api end point fetches statistics of ad for a particular date range.
 *     responses:
 *       200:
 *         description: Receive back an array of object of ad stats.
 */

router
  .route("/api/adstats/:adID/:startdate/:enddate")
  .get(collectionCtrl.fetchAdStatsByDateRange);

/**
 * @swagger
 * /api/update/campaign/:campaignID:
 *   put:
 *     summary: Update a campaign
 *     description: This api end point updates a campaign using the provided campaignID.
 *     responses:
 *       200:
 *         description: Receive back an object of the updated campaign.
 */

router
  .route("/api/update/campaign/:campaignID")
  .put(collectionCtrl.updateCampaign);

/**
 * @swagger
 * /api/update/adgroup/:adGroupID:
 *   put:
 *     summary: Update an adGroup
 *     description: This api end point updates an adgroup using the provided adGroupID.
 *     responses:
 *       200:
 *         description: Receive back an object of the updated adgroup.
 */

router
  .route("/api/update/adgroup/:adGroupID")
  .put(collectionCtrl.updateAdGroup);

/**
 * @swagger
 * /api/update/ad/:adID:
 *   put:
 *     summary: Update an ad
 *     description: This api end point updates an ad using the provided adGroupID.
 *     responses:
 *       200:
 *         description: Receive back an object of the updated ad.
 */

router.route("/api/update/ad/:adID").put(collectionCtrl.updateAd);

module.exports = router;
