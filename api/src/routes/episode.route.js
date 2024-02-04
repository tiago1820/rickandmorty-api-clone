const { Router } = require("express");
const episodeRoute = Router();

const EpisodeController = require("../controllers/episode.controller.js");
const epiController = new EpisodeController();

episodeRoute.post("/episode", epiController.postEpisode);
episodeRoute.get("/episode", epiController.getEpisodes);
episodeRoute.get("/episode/:ids", epiController.getOneOrMultipleEpisodes);

module.exports = episodeRoute;