# sb-module-json-cache-store  [![Node.js Package](https://github.com/SimplyBuilder/sb-module-json-cache-store/actions/workflows/npm-publish.yml/badge.svg?event=workflow_dispatch)](https://github.com/SimplyBuilder/sb-module-json-cache-store/actions/workflows/npm-publish.yml)          
The `sb-module-json-cache-store` is a Simply Builder Module designed for temporary external JSON caching. This module supports Universal Module Definition (UMD), making it compatible with various environments, including browser scripts, ES Modules (ESM), and CommonJS, as well as Node.js environments with or without ESM configuration.       
                
#         
### 🤖 Documented by Artificial Intelligence                   

This project takes a leap into the future of code documentation and maintenance. 🚀            
All commits and **[JSDoc](https://jsdoc.app/)** comments were created automatically by the advanced AI of **ChatGPT**, showcasing a seamless integration between human creativity and artificial intelligence.                         

By leveraging ChatGPT's capabilities, we've ensured that the documentation is not only comprehensive but also up-to-date with the latest standards. This collaboration marks a step forward in our pursuit of innovative solutions, making our codebase more accessible and easier to understand for developers worldwide.               

Embrace the future of coding with us. 🌟            

            
#           
## Features

- **Universal Compatibility**: Works in the browser, with ES Modules, and in Node.js environments.
- **Flexible Caching**: Temporary caching of external JSON data with configurable TTL (Time To Live).
- **Performance Optimization**: Reduces redundant network requests by caching fetched JSON data.

## Installation

This module is designed to be included directly in your project. You can reference it in your HTML or JavaScript files depending on your project setup and module system.


#     
### Browser Usage (Script Tag)          
CDN:        
~~~text
https://unpkg.com/@jamilservices/sb-module-json-cache-store@latest/lib/json-cache.min.umd.js
https://cdn.jsdelivr.net/npm/@jamilservices/sb-module-json-cache-store@latest/lib/json-cache.min.umd.js
https://cdn.skypack.dev/@jamilservices/sb-module-json-cache-store@latest/lib/json-cache.min.umd.js?min
~~~              

~~~html
<script src="https://unpkg.com/@jamilservices/sb-module-json-cache-store@latest/lib/json-cache.min.umd.js"></script>
<script>
    if(SimplyBuilder?.jsonCache) console.log("jsonCache loaded.");
</script>
~~~        
        
#     
### ESM Import Module        
For modern browsers supporting ES Modules:

~~~html
<script type="module">
    import "https://unpkg.com/@jamilservices/sb-module-json-cache-store@latest/lib/json-cache.min.umd.js";
    if(SimplyBuilder?.jsonCache) console.log("jsonCache loaded.");
</script>
~~~        

#     
### CommonJS Require         
If you're using a CommonJS environment like Node.js:

~~~javascript
const {jsonCache} = require("lib/json-cache.min.umd.cjs");
if(jsonCache) console.log("jsonCache loaded.");
~~~        

#     
### Node.js without "type": "module" or .mjs extension       

For Node.js environments not configured for ES Modules:

~~~javascript
"use strict";

const importTest = () => {
    (async () => {
        const SimplyBuilder = await import("@jamilservices/sb-module-json-cache-store");
        const {jsonCache} = SimplyBuilder["default"];
        if(jsonCache) console.log("jsonCache loaded from import test");
    })();
};

const requireTest = () => {
    const {jsonCache} = require("@jamilservices/sb-module-json-cache-store");
    if(jsonCache) console.log("jsonCache loaded");
}

importTest();
requireTest();
~~~        

#     
### Node.js with "type": "module", or .mjs extension           
For Node.js environments configured for ES Modules:

~~~javascript
"use strict";

import SimplyBuilder from "@jamilservices/sb-module-json-cache-store";
const {jsonCache} = SimplyBuilder;
if(jsonCache) console.log("jsonCache loaded");
~~~        

#     
### Configuration
The jsonCache function offers several configuration options to fine-tune how caching behaves. These options allow you to set the Time To Live (TTL) for cache entries, define a minimum TTL, and configure the interval for automatic cache cleanup. Understanding and utilizing these settings can significantly enhance the performance and efficiency of your application by optimizing how data is cached.        

#### Options Overview:     
- ***ttl (Time To Live):*** This setting determines how long (in milliseconds) cached data remains valid before it expires. Once expired, the data will no longer be served from the cache and will be fetched again as needed. The default TTL is 300,000 milliseconds (5 minutes), providing a balance between data freshness and reducing network requests.     
- ***min (Minimum TTL):*** The minimum TTL setting specifies the shortest allowable time (in milliseconds) that data can remain in the cache. This is particularly useful for ensuring that frequently updated data does not remain cached for too long. The default minimum TTL is 60,000 milliseconds (1 minute).    
- ***clean (Autoclean Interval):*** The autoclean interval controls how frequently (in milliseconds) the cache checks for and removes expired entries. This process helps manage memory usage and ensures that stale data is promptly cleared. The default autoclean interval is 15,000 milliseconds (15 seconds), allowing the cache to quickly adapt to changes in the cached data.     
          
#
#### Configuring jsonCache:       
To utilize these settings, pass a configuration object to the jsonCache function when initializing your cache instance. Here is an example demonstrating how to customize all three settings:        
      
~~~javascript
const cacheConfig = {
    ttl: 600000, // 10 minutes
    min: 120000, // 2 minutes
    clean: 30000 // 30 seconds
};

const cache = jsonCache(cacheConfig);
~~~            

This configuration extends the TTL to 10 minutes, sets a minimum TTL of 2 minutes, and configures the cache to perform autocleanup every 30 seconds. Adjust these values based on your application's specific needs and data freshness requirements.         

#### JsonCacheInterface Public Methods      
After configuring your cache with jsonCache, you can interact with the cached data using the following public methods provided by the JsonCacheInterface class:      
clear()      
- ***Description:*** Clears all data from the cache.      
- ***Usage:*** This method is useful when you need to manually purge the cache, either for testing purposes or to respond to specific application events that invalidate all cached data.     

settings
- ***Description:*** A getter that returns the current cache settings.      
- ***Usage:*** Access this property to review the cache's configuration. This can include the TTL, minimum TTL, and autoclean interval settings, providing insight into the cache's operational parameters.

getJson(data)
- ***Parameters:***
  - `data`: An object containing the request details.        
  - `ttl`: (optional): Custom Time To Live for this request. Note: This cannot be smaller than the default TTL defined in the cache's initial configuration.    
  - `dynamic`:  (optional): When set to true, calculates a TTL within the range of the minimum value and the default TTL, based on the file size in bytes. This ensures that larger files have a shorter TTL within the defined range.
- ***Returns:*** A Promise that resolves to the fetched JSON data or `undefined` if an error occurs.                  
- ***Description:*** Fetches JSON data from a specified URL with optional caching behavior. If the data is already cached and has not expired, the cached version is returned. Otherwise, the data is fetched from the URL, cached, and then returned.            
- ***Usage:*** Use this method to retrieve JSON data that needs to be cached for performance reasons. The optional ttl and dynamic parameters offer flexibility for handling specific requests differently from the general cache settings.          


### Example Usage             
Here's how you might use these methods in a typical application scenario:         
~~~javascript
// Assuming jsonCache has been initialized as 'cache'

// To clear the cache
cache.clear();

// To access the current settings
console.log(cache.settings);

// Fetch JSON data with caching, considering custom TTL and dynamic behavior
cache.getJson({
    url: 'https://example.com/data.json',
    ttl: 120000, // Custom TTL, must not be smaller than default
    dynamic: true // Adjusts TTL based on file size
}).then(data => {
    if (data) {
        console.log('Fetched data:', data);
    } else {
        console.error('Failed to fetch data.');
    }
});
~~~

#       
### Best Practices:

Adapt TTL Based on Data Volatility: For data that changes infrequently, a longer TTL can reduce network traffic and improve performance. Conversely, for rapidly updating data, a shorter TTL ensures users receive the most current information.

Monitor Cache Size: If your application caches a large amount of data, consider reducing the autoclean interval to more aggressively manage memory usage.

Test Different Configurations: Cache behavior can significantly impact application performance. Experiment with different settings to find the optimal configuration for your use case.

By carefully configuring the jsonCache function, you can achieve an effective caching strategy that enhances your application's responsiveness and efficiency.


#
### <span id="license">License</span>

Released under [MIT](/LICENSE) by [@jamilservicos](https://github.com/jamilservicos).

* You can freely modify and reuse.
* The original license must be included with copies of this software.
* Please link back to this repo if you use a significant portion the source code.


#
### <span id="technologies">👩‍💻💻 Technologies</span>

![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![TypeScript](https://img.shields.io/badge/-TypeScript-196cb2?style=for-the-badge&logo=typescript&logoColor=white)
![Nodejs](https://img.shields.io/badge/-Nodejs-339933?style=for-the-badge&logo=node-dot-js&logoColor=white)

#