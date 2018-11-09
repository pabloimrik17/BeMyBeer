require('dotenv').config();

export default class EnviromentVariableHandler {
  static getVariableByEnvironment(variableName: string, env: string = process.env.NODE_ENV): any {
    const variableNameInEnvironment: string = `${env.toUpperCase()}_${variableName}`;

    if (!process.env || !process.env[variableNameInEnvironment]) {
      throw new Error('TODO getVariableByEnvironment error');
    }

    return process.env[variableNameInEnvironment];
  }
}
