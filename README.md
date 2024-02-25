# Documentation

## Introduction

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

| Key   | Type           | Description                                  |
|-------|----------------|----------------------------------------------|
| count | int            | The length of the response                   |
| pages | int            | The amount of pages                          |
| next  | string (url)   | Link to the next page (if it exists)         |
| prev  | string (url)   | Link to the previous page (if it exists)     |

### GET http://localhost:3001/character

```json
{
	"info": {
		"count": 146,
		"pages": 1,
		"next": null,
		"prev": null
	},
	"results": [
		// ...
	]
}
```

## Character

At the moment, there are more than 140 (test) characters ordered by ID. Please note that this information is subject to change as the development progresses.

## Character Schema

| Key       | Type           | Description                                                                                           |
|-----------|----------------|-------------------------------------------------------------------------------------------------------|
| id        | int            | The id of the character.                                                                              |
| name      | string         | The name of the character.                                                                            |
| status    | string         | The status of the character ('Alive', 'Dead' or 'unknown').                                           |
| species   | string         | The species of the character.                                                                         |
| type      | string         | The type or subspecies of the character.                                                              |
| gender    | string         | The gender of the character ('Female', 'Male', 'Genderless' or 'unknown').                             |
| origin    | object         | Name and link to the character's origin location.                                                      |
| location  | object         | Name and link to the character's last known location endpoint.                                         |
| image     | string (url)   | Link to the character's image. All images are 300x300px and most are medium shots or portraits since they are intended to be used as avatars.|
| episode   | array (urls)   | List of episodes in which this character appeared.                                                     |
| url       | string (url)   | Link to the character's own URL endpoint.                                                              |
| created   | string         | Time at which the character was created in the database.                                               |

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
		},
        // ...
    ]
}
```
## Get a Single Character

You can retrieve a single character by specifying the character's ID as a parameter in the endpoint: `/character/{id}`.

### GET http://localhost:3001.com/character/145

```json
{
	"info": {
		"count": 1,
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
			"image": "https://rickandmorty-api-clone.s3.sa-east-1.amazonaws.com/01.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAVV7FS3Z6YR7HOV5U%2F20240223%2Fsa-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240223T164505Z&X-Amz-Expires=60&X-Amz-Signature=3881311af3313cd7e52ea9fae685a3c5ae91022b67984fa30632cdd5480c4dd2&X-Amz-SignedHeaders=host&x-id=GetObject",
			"episode": null,
			"url": "http://localhost:3001/character/145",
			"created": "2024-02-23T12:58:36.385Z"
		}
	]
}
```

## Get multiple characters

You can get multiple characters by adding ids separated by commas. `/character/1,2,3`.

### GET http://localhost.com/character/145,146

```json
{
	"info": {
		"count": 2,
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
			"image": "https://rickandmorty-api-clone.s3.sa-east-1.amazonaws.com/01.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAVV7FS3Z6YR7HOV5U%2F20240223%2Fsa-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240223T170222Z&X-Amz-Expires=60&X-Amz-Signature=f6e72b834222ad5d3ca8c2ccd4b71f6bb03ac2d67e9fdbbd7f4b2f63d4d26a76&X-Amz-SignedHeaders=host&x-id=GetObject",
			"episode": null,
			"url": "http://localhost:3001/character/145",
			"created": "2024-02-23T12:58:36.385Z"
		},
		{
			"id": 146,
			"name": "Alexandra",
			"status": "Alive",
			"species": "Human",
			"type": null,
			"gender": "Female",
			"origin": {
				"name": "Saturn",
				"url": "https://rickandmortyapi.com/api/location/1"
			},
			"location": {
				"name": "Saturn",
				"url": "http://localhost:3001/location/8"
			},
			"image": "https://rickandmorty-api-clone.s3.sa-east-1.amazonaws.com/01.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAVV7FS3Z6YR7HOV5U%2F20240223%2Fsa-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240223T170222Z&X-Amz-Expires=60&X-Amz-Signature=f6e72b834222ad5d3ca8c2ccd4b71f6bb03ac2d67e9fdbbd7f4b2f63d4d26a76&X-Amz-SignedHeaders=host&x-id=GetObject",
			"episode": null,
			"url": "http://localhost:3001/character/146",
			"created": "2024-02-23T12:59:49.473Z"
		}
	]
}
```

## Filter Characters

You can include filters in the URL by adding additional query parameters. To begin filtering, add a `?` followed by the query `<query>=<value>`. If you want to chain several queries in the same call, use `&` followed by the query.

## Available Parameters for Filtering

- **name**: Filter characters by the given name.
- **status**: Filter characters by the given status (alive, dead, or unknown).
- **species**: Filter characters by the given species.
- **type**: Filter characters by the given type.
- **gender**: Filter characters by the given gender (female, male, genderless, or unknown).

### GET http://localhost:3001.com/character/?name=rick&status=alive

```json
{
	"info": {
		"count": 2,
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
			"image": "https://rickandmorty-api-clone.s3.sa-east-1.amazonaws.com/01.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAVV7FS3Z6YR7HOV5U%2F20240223%2Fsa-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240223T194504Z&X-Amz-Expires=60&X-Amz-Signature=8498f46be61ea598a902055771312eb50dfc4e95e5ad0814838f72d5111c5088&X-Amz-SignedHeaders=host&x-id=GetObject",
			"episode": null,
			"url": "http://localhost:3001/character/145",
			"created": "2024-02-23T12:58:36.385Z"
		},
		// ...
	]
}
```