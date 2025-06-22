import { exec } from 'child_process';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Carrega as variáveis de ambiente
dotenv.config();

const configPath = path.resolve(__dirname, 'sequelize-cli.config.js');
const migrationsPath = path.resolve(__dirname, 'migrations');

function runCommand(command: string): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log(`Executando: ${command}`);

    exec(command, (error, stdout, stderr) => {
      if (stdout) console.log(stdout);
      if (stderr) console.error(stderr);

      if (error) {
        console.error(`Erro ao executar comando: ${error.message}`);
        return reject(error);
      }

      resolve();
    });
  });
}

async function migrate() {
  try {
    await runCommand(
      `npx sequelize-cli db:migrate --config "${configPath}" --migrations-path "${migrationsPath}"`,
    );

    console.log('Migrações executadas com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('Erro ao executar migrações:', error);
    process.exit(1);
  }
}

migrate();
