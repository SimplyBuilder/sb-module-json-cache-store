"use strict";

const itemId = "itemId-MKAxEwyDLxPivjuKpAGLwfDUKuatRl4w8E77grcbcNs";
const itemJson = JSON.stringify({
    element: "section",
    dataset: {
        state: "hello-world.view",
        example: "hello-word"
    },
    shadow: {
        mode: "closed",
        styles: JSON.stringify("html {  width: 100%;  max-width: 100%;  height: 100%;  max-height: 100%;  box-sizing: border-box;  margin: 0;  padding: 0;  outline: none;  -webkit-font-smoothing: antialiased;  -moz-osx-font-smoothing: grayscale;  background-color: #fff;  overflow: hidden;}*,*::before,*::after {  width: fit-content;  height: fit-content;  min-width: auto;  min-height: auto;  max-width: inherit;  max-height: inherit;  box-sizing: border-box;  margin: 0;  padding: 0;  outline: none;  -webkit-font-smoothing: antialiased;  -moz-osx-font-smoothing: grayscale;  background: transparent;}body {  background-color: inherit;  color: #000;  width: 100%;  height: 100%;  overflow: auto;}h1, h2, h3, h4, h5, h6 {  font-weight: 500;}strong,b {  font-weight: bold;  line-height: inherit;}em,i {  font-style: italic;  line-height: inherit;}ul, ol {  list-style: disc inside;}ul[role=list],ol[role=list] {  list-style: none;}a {  color: inherit;  text-decoration: none;}img,picture {  display: block;  max-width: 100%;}input,button,textarea,select {  font: inherit;  color: inherit;}svg {  pointer-events: none;}.hello-word {  display: flex;  width: inherit;  height: inherit;  align-items: center;  justify-items: center;  background-color: rgba(240, 248, 255, 0.9);  flex-wrap: nowrap;  flex-direction: column;  justify-content: center;}.hello-word .title {  color: rgba(0, 0, 0, 0.9);  font-size: 3rem;  font-weight: bold;}")
    },
    children: [
        {
            element: "article",
            attr: {
                class: "hello-word"
            },
            children: [
                {
                    element: "span",
                    attr: {
                        class: "title"
                    },
                    text: "Hello Word"
                }
            ]
        }
    ]
});

const items = new Map();
const data = {
    url: 'https://gist.githubusercontent.com/jamilservicos/19709abf0d44f914ecb8337e8bff220b/raw/sb-struct-hello-world.json',
    ttl: 100,
    json: itemJson
}

const instance = {
    instanceOf: 'CacheStoreInterface',
    getKey: (data) => {
        if(data) return itemId;
        return undefined;
    },
    store: () => {
        return {items};
    }
};

module.exports = {
    instance, items, data, itemId, itemJson
};