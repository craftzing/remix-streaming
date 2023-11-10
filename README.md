# @craftzing/remix-streaming

[![code-review](https://github.com/craftzing/remix-streaming/workflows/code-review/badge.svg)](https://github.com/craftzing/remix-streaming/actions/workflows/code-review.yml)
[![release](https://github.com/craftzing/remix-streaming/workflows/release/badge.svg)](https://github.com/craftzing/remix-streaming/actions/workflows/release.yml)

## Development

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Deployment

Create a release commit, tag it & push it. This will build a docker image & deploy it on the server.

```sh
git add package.json
git commit -m "chore(release): v1.2.3
git push
git tag v1.2.3
git push --tags
```

## Streaming issues behind nginx proxy

Turns out by default nginx has this setting `proxy_buffering` turned on, this "buffers" the upstream response and only responds when it "finished buffering". Because of this, it was not possible to leverage [Remix Streaming](https://remix.run/docs/en/main/guides/streaming).

We would see a super slow response from the server as it's awaiting the Node.js process response to finish
![Screenshot 2023-11-10 at 12 58 56](https://github.com/craftzing/remix-streaming/assets/1210628/b107713f-7984-4216-bff9-2374fe678f42)

After adding `proxy_buffering off` to our nginx config ([bd2fa6df5b8b82f44969f9ad21a260e335ec83da](https://github.com/craftzing/remix-streaming/commit/bd2fa6df5b8b82f44969f9ad21a260e335ec83da)), we saw an instant response from the server while the content is streaming, which is the desired behavior.
![Screenshot 2023-11-10 at 13 12 05](https://github.com/craftzing/remix-streaming/assets/1210628/96e7933f-9be9-47a3-a05e-aa39dfac9f3e)

