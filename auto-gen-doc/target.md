# <%= title %>

<%= description %>

## Props

|Name|Description|Type|Required|Default|
|:---:|:---:|:---:|:---:|:---:|<% props.forEach(prop => { %>
|<%= prop.name %>|<%= prop.description %>|`<%= prop.type %>`|`<%= prop.required %>`|`<%= prop.default %>`| <% }); %>

## Events

|Event Name|Description|Parameters|
|:---:|:---:|:---:|
|input|-|-|
