# DESIGN

I tried to get as close as possible to the Figma file, while reusing Bootstrap classes and minimizing extra css. I used native dashed border for placeholder cards - which differs from the design but makes sense conceptually. In real project I would discuss that solution first before going for custom implementation.

# ARCHITECTURE

For simple app like this Vuex might seem like an overkill but I went after implementation that is good for scaling, as if this was start of a bigger project.

I spent some effort to make the store fully typed. Vuex required some tricks to define own store type - I linked used resources at the top of the file.

This pattern is opened for modules so features could be encapsulated in a larger app.

# TESTS

Testing required to add vitest.config file and few node packages.
All logic was moved to store so that's the main place holding tests. I created snapshot tests per each vue component capturing different states of the component defined via v-if statements

# TODO

I had a problem on initial start of the raw project - inport for google fonts css didn't work. I moved it to css import as a quickfix. This could be solved in other ways like editing public index.html head, or webpack loaders. I went with the easiest solution. In real world that would be something to discuss.