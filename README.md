# Documentation site for Respoke.io

https://docs.respoke.io

## Working on the docs

```bash
git clone https://github.com/respoke/docs respoke-docs
cd respoke-docs
npm install
npm start
```

The first time you run it, there is a bug where you have to kill it and restart `npm start`. Then it will work correctly. We will fix that soon.

The site is hosted locally at http://localhost:2003/

## Co-development of Respoke Styles

Branding and styles are stored as an npm package (unpublished) at https://github.com/respoke/style for reuse.

You can check out the styles and develop them in tandem with the docs using `npm link`.

*Example*
```bash
git clone https://github.com/respoke/docs respoke-docs
cd respoke-docs
npm install
cd ../
git clone https://github.com/respoke/style respoke-style
cd respoke-style
npm install
npm link
cd ../respoke-docs
npm link respoke-style
npm start
```

## License

This source code is licensed under The MIT License found in the
[LICENSE](LICENSE) file in the root directory of this source tree.


## Content Reorganization Branch of Docs
![Reorg Docs](http://i.imgur.com/1qnFUGO.png)

