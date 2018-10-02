import App from './App'

async function main () {
  const app: App = new App();
  await app.run();
}

main();