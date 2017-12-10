'use strict';

exports.createCategory =  {
    "definitions": {},
    "$schema": "http://json-schema.org/draft-06/schema#",
    "$id": "http://example.com/example.json",
    "type": "object",
    "properties": {
        "name": {
            "$id": "/properties/name",
            "type": "string",
            "title": "The Name Schema.",
            "description": "An explanation about the purpose of this instance.",
            "default": "",
            "examples": [
                "asdasd"
            ]
        }
    },
    "required": [
        "name"
    ]
};