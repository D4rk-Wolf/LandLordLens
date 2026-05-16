/**
 * Swagger/OpenAPI documentation configuration
 */

import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'LandlordLens API',
            version: '1.0.0',
            description: 'A modern property management and compliance tracking system for UK landlords',
            contact: {
                name: 'API Support',
                email: 'support@landlordlens.com',
            },
            license: {
                name: 'UNLICENSED',
            },
        },
        servers: [
            {
                url: process.env.FRONTEND_URL || 'http://localhost:5000',
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            description: 'User ID',
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'User email address',
                        },
                        name: {
                            type: 'string',
                            description: 'User full name',
                        },
                        role: {
                            type: 'string',
                            enum: ['landlord', 'admin', 'tenant'],
                            description: 'User role',
                        },
                        subscription: {
                            type: 'string',
                            enum: ['free', 'basic', 'premium'],
                            description: 'Subscription tier',
                        },
                    },
                },
                Property: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'Property ID',
                        },
                        address: {
                            type: 'object',
                            properties: {
                                line1: { type: 'string' },
                                line2: { type: 'string' },
                                city: { type: 'string' },
                                postcode: { type: 'string' },
                                county: { type: 'string' },
                                country: { type: 'string' },
                            },
                        },
                        propertyType: {
                            type: 'string',
                            enum: ['house', 'flat', 'apartment', 'bungalow', 'other'],
                        },
                        bedrooms: { type: 'number' },
                        bathrooms: { type: 'number' },
                        rentAmount: { type: 'number' },
                        status: {
                            type: 'string',
                            enum: ['vacant', 'occupied', 'maintenance'],
                        },
                    },
                },
                Error: {
                    type: 'object',
                    properties: {
                        error: {
                            type: 'string',
                            description: 'Error message',
                        },
                        details: {
                            type: 'array',
                            items: { type: 'object' },
                            description: 'Validation error details',
                        },
                    },
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    // Look for .ts files in development, .js files in production might be needed if not compiled to strict structure or using ts-node
    apis: ['./server/routes/*.ts', './server/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
