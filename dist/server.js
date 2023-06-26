'use strict';
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const mongoose_1 = __importDefault(require('mongoose'));
const index_1 = __importDefault(require('./config/index'));
const app_1 = __importDefault(require('./app'));
require('colors');
//* Handle Uncaught Exception
process.on('uncaughtException', (error) => {
  console.log('Uncaught Exception is detected...');
  console.log(error);
  process.exit(1);
});
let server;
//* Database Connection
const dbConnect = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      yield mongoose_1.default.connect(index_1.default.database_url);
      console.log(`Database Connected`.yellow.italic);
      server = app_1.default.listen(index_1.default.port, () => {
        console.log(`Server Up and Running`.cyan.bold);
      });
    } catch (error) {
      console.log(`Failed to connect database`, error);
    }
    //* Handle Unhandled Rejection
    process.on('unhandledRejection', (error) => {
      console.log(
        'Unhandled Rejection is detected, we are closing our server...'
      );
      if (server) {
        server.close(() => {
          console.log(error);
          process.exit(1);
        });
      } else {
        process.exit(1);
      }
    });
  });
dbConnect();
process.on('SIGTERM', () => {
  console.log('SIGTERM is received');
  if (server) {
    server.close();
  }
});
