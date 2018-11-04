import { container } from './api/ioc/ioc';
import { ClassTypes } from './api/ioc/types';
import App from './App';

async function main() {
  const app: App = container.get<App>(ClassTypes.App);
  await app.run();
}

main();
