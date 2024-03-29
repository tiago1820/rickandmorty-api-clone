# Documentation

## Introduction

This project is a clone of the Rick and Morty API, developed with the aim of learning and applying my knowledge in specific technologies. The goal of this project is to recreate the functionality of the Rick and Morty API using the technologies I learned and am learning.

This documentation will help you get familiar with the resources of the Rick and Morty API and show you how to make different queries, so that you can get the most out of it.

## REST

- **Base URL**: [http://localhost:3001/api](http://localhost:3001/api)
  - The base URL contains information about all available API's resources.
  - All responses will return data in JSON.

### GET http://localhost:3001/api

```json
{
  "characters": "http://localhost:3001/api/character",
  "locations": "http://localhost:3001/api/location",
  "episodes": "http://localhost:3001/api/episode"
}
```

### Available Resources

- **Character**: Used to get all the characters.
- **Location**: Used to get all the locations.
- **Episode**: Used to get all the episodes.

## Info and Pagination

The API automatically paginates the responses, with each page containing up to 20 documents.

Each resource includes an info object providing additional information about the response.

| Key   | Type         | Description                              |
| ----- | ------------ | ---------------------------------------- |
| count | int          | The length of the response               |
| pages | int          | The amount of pages                      |
| next  | string (url) | Link to the next page (if it exists)     |
| prev  | string (url) | Link to the previous page (if it exists) |

### GET http://localhost:3001/character

```json
{
  "info": {
    "count": 77,
    "pages": 3,
    "next": "http://localhost:3001/api/character/3",
    "prev": "http://localhost:3001/api/character/1"
  },
  "results": [
    // ...
  ]
}
```

## Character

At the moment, there are more than 140 (test) characters ordered by ID. Please note that this information is subject to change as the development progresses.

## Character Schema

| Key      | Type         | Description                                                                                                                                   |
| -------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| id       | int          | The id of the character.                                                                                                                      |
| name     | string       | The name of the character.                                                                                                                    |
| status   | string       | The status of the character ('Alive', 'Dead' or 'unknown').                                                                                   |
| species  | string       | The species of the character.                                                                                                                 |
| type     | string       | The type or subspecies of the character.                                                                                                      |
| gender   | string       | The gender of the character ('Female', 'Male', 'Genderless' or 'unknown').                                                                    |
| origin   | object       | Name and link to the character's origin location.                                                                                             |
| location | object       | Name and link to the character's last known location endpoint.                                                                                |
| image    | string (url) | Link to the character's image. All images are 300x300px and most are medium shots or portraits since they are intended to be used as avatars. |
| episode  | array (urls) | List of episodes in which this character appeared.                                                                                            |
| url      | string (url) | Link to the character's own URL endpoint.                                                                                                     |
| created  | string       | Time at which the character was created in the database.                                                                                      |

## Get All Characters

You can access the list of characters by using the `/character` endpoint.

### GET http://localhost:3001.com/character

```json
{
  "info": {
    "count": 146,
    "pages": 1,
    "next": null,
    "prev": null
  },
  "results": [
    {
      "id": 145,
      "name": "Tiago",
      "status": "Alive",
      "species": "Human",
      "type": null,
      "gender": "Male",
      "origin": {
        "name": "Mars",
        "url": "https://rickandmortyapi.com/api/location/1"
      },
      "location": {
        "name": "Saturn",
        "url": "http://localhost:3001/location/8"
      },
      "image": "https://rickandmorty-api-clone.s3.sa-east-1.amazonaws.com/01.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAVV7FS3Z6YR7HOV5U%2F20240223%2Fsa-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240223T162524Z&X-Amz-Expires=60&X-Amz-Signature=0a97655d71c8248dc2e07b19e9025be3022fb33510d607fe165fb10700cbe9cf&X-Amz-SignedHeaders=host&x-id=GetObject",
      "episode": null,
      "url": "http://localhost:3001/character/145",
      "created": "2024-02-23T12:58:36.385Z"
    }
    // ...
  ]
}
```

## Get a Single Character

You can retrieve a single character by specifying the character's ID as a parameter in the endpoint: `/character/{id}`.

### GET http://localhost:3001.com/character/1

```json
{
  "id": 1,
  "name": "Tiago",
  "status": "Alive",
  "species": "Human",
  "type": null,
  "gender": "Male",
  "origin": {
    "name": "Argentina",
    "url": "http://localhost:3001/api/location/2"
  },
  "location": {
    "name": "Brasil",
    "url": "http://localhost:3001/api/location/1"
  },
  "image": null,
  "episode": [
    "http://localhost:3001/api/episode/1",
    "http://localhost:3001/api/episode/2",
    "http://localhost:3001/api/episode/3",
    "http://localhost:3001/api/episode/4",
    "http://localhost:3001/api/episode/5"
  ],
  "url": "http://localhost:3001/api/character/1",
  "created": "2024-02-27T03:48:38.291Z"
}
```

## Get multiple characters

You can get multiple characters by adding ids separated by commas. `/character/1,2,3`.

### GET http://localhost.com/character/1,3

```json
[
  {
    "id": 3,
    "name": "Tiago",
    "status": "Alive",
    "species": "Human",
    "type": null,
    "gender": "Male",
    "origin": {
      "name": "Estados Unidos",
      "url": "http://localhost:3001/api/location/3"
    },
    "location": {
      "name": "Estados Unidos",
      "url": "http://localhost:3001/api/location/3"
    },
    "image": null,
    "episode": ["http://localhost:3001/api/episode/1"],
    "url": "http://localhost:3001/api/character/3",
    "created": "2024-02-27T03:47:40.682Z"
  },
  {
    "id": 1,
    "name": "Tiago",
    "status": "Alive",
    "species": "Human",
    "type": null,
    "gender": "Male",
    "origin": {
      "name": "Argentina",
      "url": "http://localhost:3001/api/location/2"
    },
    "location": {
      "name": "Brasil",
      "url": "http://localhost:3001/api/location/1"
    },
    "image": null,
    "episode": [
      "http://localhost:3001/api/episode/1",
      "http://localhost:3001/api/episode/2",
      "http://localhost:3001/api/episode/3",
      "http://localhost:3001/api/episode/4",
      "http://localhost:3001/api/episode/5"
    ],
    "url": "http://localhost:3001/api/character/1",
    "created": "2024-02-27T03:48:38.291Z"
  }
]
```

## Filter characters

You can also include filters in the URL by including additional query parameters. To start filtering add a ? followed by the query <query>=<value>. If you want to chain several queries in the same call, use & followed by the query.

For example, If you want to check how many alive Ricks exist, just add ?name=rick&status=alive to the URL.

## Available Parameters

You can include the following parameters to filter your queries:

- **name**: Filter by the given name.
- **status**: Filter by the given status (alive, dead, or unknown).
- **species**: Filter by the given species.
- **type**: Filter by the given type.
- **gender**: Filter by the given gender (female, male, genderless, or unknown).

### GET http://localhost.com/character/?name=Tiago&status=Alive

```json
{
  "info": {
    "count": 5,
    "pages": 1,
    "next": "http://localhost:3001/api/character/1",
    "prev": "http://localhost:3001/api/character/1"
  },
  "results": [
    {
      "id": 2,
      "name": "Tiago",
      "status": "Alive",
      "species": "Human",
      "type": null,
      "gender": "Male",
      "origin": {
        "name": "Estados Unidos",
        "url": "http://localhost:3001/api/location/3"
      },
      "location": {
        "name": "Estados Unidos",
        "url": "http://localhost:3001/api/location/3"
      },
      "image": null,
      "episode": ["http://localhost:3001/api/episode/1"],
      "url": "http://localhost:3001/api/character/2",
      "created": "2024-02-27T03:47:38.450Z"
    }
    // ...
  ]
}
```

## Location

There is a total of X locations sorted by id.

## Location Schema

| Key       | Type         | Description                                                 |
| --------- | ------------ | ----------------------------------------------------------- |
| id        | int          | The unique identifier of the location.                      |
| name      | string       | The name of the location.                                   |
| type      | string       | The type of the location.                                   |
| dimension | string       | The dimension in which the location is located.             |
| residents | array (urls) | List of characters who have been last seen in the location. |
| url       | string (url) | Link to the location's own endpoint.                        |
| created   | string       | Time at which the location was created in the database.     |

## Get all locations

You can access the list of locations by using the /location endpoint.

### GET http://localhost.com/api/location

```json
{
  "info": {
    "count": 68,
    "pages": 3,
    "next": "http://localhost:3001/api/location/2",
    "prev": "http://localhost:3001/api/location/3"
  },
  "results": [
    {
      "id": 27,
      "name": "Estados Unidos",
      "type": null,
      "dimension": null,
      "residents": null,
      "url": "http://localhost:3001/api/location/27",
      "created": "2024-02-27T17:33:11.408Z"
    }
    // ...
  ]
}
```

### Get a single location

You can get a single location by adding the id as a parameter: /location/3

### GET http://localhost.com/api/location/3

```json
{
  "id": 3,
  "name": "Estados Unidos",
  "type": null,
  "dimension": null,
  "residents": [
    "http://localhost:3001/api/character/1",
    "http://localhost:3001/api/character/2"
    // ...
  ],
  "url": "http://localhost:3001/api/location/3",
  "created": "2024-02-27T03:46:40.354Z"
}
```

### Get multiple locations

You can get multiple locations by adding ids separated by commas. `/location/1,2,3`.

```json
[
  {
    "id": 2,
    "name": "Argentina",
    "type": null,
    "dimension": null,
    "residents": null,
    "url": "http://localhost:3001/api/location/2",
    "created": "2024-02-27T03:46:31.676Z"
  },
  {
    "id": 3,
    "name": "Estados Unidos",
    "type": null,
    "dimension": null,
    "residents": [
      "http://localhost:3001/api/character/1",
      "http://localhost:3001/api/character/2",
	  // ...
    ],
    "url": "http://localhost:3001/api/location/3",
    "created": "2024-02-27T03:46:40.354Z"
  }
  // ...
]
```

### Filter locations

## Available Parameters

You can include the following parameters to filter your queries:

- **name**: Filter by the given name.
- **type**: Filter by the given type.
- **dimension**: Filter by the given dimension.

If you want to know how to use queries, check [here](#filter-characters)

### Episode
There is a total of 51 episodes sorted by id (which is of course the order of the episodes)

## Episode Schema

| Key         | Type           | Description                                           |
|-------------|----------------|-------------------------------------------------------|
| id          | int            | The id of the episode.                                |
| name        | string         | The name of the episode.                              |
| air_date    | string         | The air date of the episode.                          |
| episode     | string         | The code of the episode.                              |
| characters  | array (urls)   | List of characters who have been seen in the episode.|
| url         | string (url)   | Link to the episode's own endpoint.                   |
| created     | string         | Time at which the episode was created in the database.|

### Get all episodes
You can access the list of episodes by using the /episode endpoint.

### GET http://localhost.com/api/episode

```json
{
	"info": {
		"count": 5,
		"pages": 1,
		"next": "http://localhost:3001/api/episode/1",
		"prev": "http://localhost:3001/api/episode/1"
	},
	"results": [
		{
			"id": 1,
			"name": "Pilot",
			"air_date": "December 2, 2013",
			"episode": "S01E01",
			"characters": [
				"http://localhost:3001/api/character/1",
				"http://localhost:3001/api/character/2",
				"http://localhost:3001/api/character/3",
				"http://localhost:3001/api/character/4",
				"http://localhost:3001/api/character/5"
			],
			"url": "https://rickandmortyapi.com/api/episode/1",
			"created": "2024-02-27T03:46:07.233Z"
		},
    // ...

	]
}
```

### Get a single episode
You can get a single episode by adding the id as a parameter: /episode/28

### GET https://localhost.com/api/episode/5

```json
{
	"id": 5,
	"name": "Pilot",
	"air_date": "December 2, 2013",
	"episode": "S01E01",
	"characters": [
		"http://localhost:3001/api/character/1",
		"http://localhost:3001/api/character/7"
	],
	"url": "https://rickandmortyapi.com/api/episode/1",
	"created": "2024-02-27T03:46:12.149Z"
}
```

### Get multiple episodes
You can get multiple episodes by adding ids separated by commas. /location/1,2,3.

```json
[
	{
		"id": 1,
		"name": "Pilot",
		"air_date": "December 2, 2013",
		"episode": "S01E01",
		"characters": [
			"http://localhost:3001/api/character/1",
			"http://localhost:3001/api/character/2",
			"http://localhost:3001/api/character/3",
			"http://localhost:3001/api/character/4",
			"http://localhost:3001/api/character/5"
		],
		"url": "https://rickandmortyapi.com/api/episode/1",
		"created": "2024-02-27T03:46:07.233Z"
	},
	{
		"id": 4,
		"name": "Pilot",
		"air_date": "December 2, 2013",
		"episode": "S01E01",
		"characters": [
			"http://localhost:3001/api/character/1"
		],
		"url": "https://rickandmortyapi.com/api/episode/1",
		"created": "2024-02-27T03:46:11.099Z"
	},
  // ...
]

```

## Filter Episodes

Available parameters:

- **name**: Filter by the given name.
- **episode**: Filter by the given episode code.

If you want to know how to use queries, check [here](#filter-characters).

### GET http://localhost:3001/api/episode/?name=Episode 2&episode=S01E01

```json
{
	"info": {
		"count": 2,
		"pages": 1,
		"next": "http://localhost:3001/api/episode/1",
		"prev": "http://localhost:3001/api/episode/1"
	},
	"results": [
		{
			"id": 6,
			"name": "Episode 2",
			"air_date": "December 2, 2013",
			"episode": "S01E01",
			"characters": null,
			"url": "https://rickandmortyapi.com/api/episode/1",
			"created": "2024-02-27T20:00:53.520Z"
		},
		{
			"id": 7,
			"name": "Episode 2",
			"air_date": "December 2, 2013",
			"episode": "S01E01",
			"characters": null,
			"url": "https://rickandmortyapi.com/api/episode/1",
			"created": "2024-02-27T20:01:43.469Z"
		}
	]
}
```
