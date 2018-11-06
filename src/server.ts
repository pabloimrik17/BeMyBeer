import { container } from './api/ioc/ioc';
import { classTypes } from './api/ioc/types';
import App from './App';

async function main() {
  const app: App = container.get<App>(classTypes.App);
  await app.run();
}

main();
