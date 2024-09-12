#!/usr/bin/env node



import dotenv from 'dotenv';
import { Octokit } from '@octokit/core';        





// Access command-line arguments
const args = process.argv.slice(2);

// Handle input arguments
if (args.length === 0) {
    console.log('Please provide a command.');
} else {
    const command = args[0];

    switch (command) {
        case 'github-activity':
            const username = args[1];

            // Check if the AUTH_TOKEN is set
            if (!process.env.AUTH_TOKEN) {
                console.error('AUTH_TOKEN environment variable is not set.');
                process.exit(1);
            }

            // Create an Octokit instance with your GitHub personal access token
            const octokit = new Octokit({
                auth: process.env.AUTH_TOKEN,
            });

            // Function to get public events for a specific user by their username
            async function getUserEvents(username) {
              try {
                  const response = await octokit.request(`GET /users/${username}/events/public`, {
                      headers: {
                          'X-GitHub-Api-Version': '2022-11-28',
                      },
                  });
          
                  // Log the events
                  console.log(response.data);
              } catch (error) {
                  console.error(`Error fetching events for user ${username}:`, error);
              }
          }

            getUserEvents(username);
            break;

        case 'help':
            console.log('Usage: github-activity <username> or help');
            break;

        default:
            console.log('Unknown command. Use "help" to see available commands.');
            break;
    }
}