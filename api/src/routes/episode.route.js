const { Router } = require("express");
const episodeRoute = Router();

const EpisodeController = require("../controllers/episode.controller.js");
const epiController = new EpisodeController();

episodeRoute.post("/api/episode", epiController.postEpisode);
episodeRoute.get("/api/episode", epiController.getEpisodes);
episodeRoute.get("/api/episode/:ids", epiController.getOneOrMultipleEpisodes);

module.exports = episodeRoute;