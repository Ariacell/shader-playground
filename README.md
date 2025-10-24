# Shader Experimenter

Project for hosting various shaders that I make. I might actually publish this at a subdomain of chaotically, hence the name, but for now it serves as a learning playground for vue, php, and webGL/simple glsl shaders. Backed by a simple flyway/postgres backend so I don't need to learn a new db schema at the same time as the other parts of the stack.

The architecture is:

Vue with Vite frontend -> php apache server -> postgresql db

# Build and run:
Spinning up the stack in dev mode (enables hot reload of the frontend):
```sh
docker compose watch frontend-dev server postgres flyway
```

Release version is as simple as just swapping off the hot reload vue image
```sh
docker compose watch frontend server postgres flyway
```

# Todo:
- [x] All components working independently locally, dockerised
- [x] Components talking to each other on localhost/docker networks
- [ ] Set up an actual display for the frontend of the stored shaders
- [ ] Make the monarco editor UI a bit less hacky, more modern idiomatic Vue
- [ ] Add unit tests for server and frontend components
- [ ] Properly finish setting up non-root user access to postgres for the apache server
- [ ] Set up proper env file and config injection for the various components
- [ ] Decide how I'd want to deploy it - learn pulumi/try deploying outside AWS for more learning? Could just do ecs to stick with what I know
- [ ] Actually use it to play with shaders more, because that was kinda the whole point initially
