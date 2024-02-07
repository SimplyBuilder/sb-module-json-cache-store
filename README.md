# sb-module-json-cache-store
Simply Builder Module - temporary external json cache

ESM script tag
~~~html
<script src="lib/json-cache.min.umd.js"></script>
<script>
    if(SimplyBuilder?.jsonCache) console.log("jsonCache loaded.");
</script>
~~~

ESM import module
~~~html
<script type="module">
    import "lib/json-cache.min.umd.mjs";
    if(SimplyBuilder?.jsonCache) console.log("jsonCache loaded.");
</script>
~~~

CommomJS require
~~~javascript
const {jsonCache} = require("lib/json-cache.min.umd.cjs");
if(jsonCache) console.log("jsonCache loaded.");
~~~