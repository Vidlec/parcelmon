#!/usr/bin/env node
import chalk from 'chalk'
import { ChildProcess, exec } from 'child_process'
import Bundler, { ParcelOptions } from 'parcel-bundler'
import Path from 'path'

import { pipe, toString } from './utils'

const entryFiles = [Path.join(process.cwd(), '/src/index.ts')]

const options: ParcelOptions = {
  target: 'node',
  hmr: false,
  watch: true,
  minify: false,
}

const run = () => {
  const bundler = new Bundler(entryFiles, options)

  let childProcess: ChildProcess = null

  bundler.on('bundled', () => {
    const runCode = `node ${Path.join(process.cwd(), '/dist/index.js')}`

    if (!!process) childProcess.kill()

    childProcess = exec(runCode)

    console.log('\nStdout 👇\n')

    process.stdout.on(
      'data',
      pipe(
        toString,
        console.log,
      ),
    )
    process.stderr.on(
      'data',
      pipe(
        toString,
        chalk.red,
        console.log,
      ),
    )
  })

  bundler.on('buildStart', () => {
    console.clear()
  })

  bundler.bundle()
}

run()
