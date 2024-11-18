### Application for Creating Tournament Brackets  

This app helps you to:
1. Create a competition with a brief description.
2. Allow participants to register for the competition.
3. Generate tournament brackets.  

This is the frontend part of the Brackets app.

To view the backend, visit the [brackets-back](https://github.com/pavelmno4/brackets-back) repository.

Set up the following environment variables and start the app:
| variable         | type   | required |
|------------------|--------|----------|
| BACKEND_BASE_URL | text   | true     |

For developing run:
`npm run dev`

For buid docker-image:
```
docker buildx build \
--builder=extended_driver \
--platform linux/arm64 \
--build-arg ORIGIN=https://your-domain.org \
--output type=docker \
--tag brackets-front:1.0.0 .
```