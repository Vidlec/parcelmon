#!/usr/bin/env node
import chalk from 'chalk'
import { ChildProcess, exec } from 'child_process'
import Bundler, { ParcelOptions } from 'parcel-bundler'
import { argv } from 'yargs'

import { pipe, toString } from './utils'

const entry = argv.entry as string
const outDir = (argv.outDir as string) || './dist'

const outputFile = `${outDir}/index.js`

const options: ParcelOptions = {
  target: 'node',
  outDir,
  outFile: 'index.js',
  hmr: false,
  watch: true,
  minify: false,
}

const run = () => {
  const bundler = new Bundler(entry, options)

  let childProcess: ChildProcess = null

  bundler.on('bundled', () => {
    const runCode = `node ${outputFile}`

    if (!!childProcess) childProcess.kill()

    childProcess = exec(runCode)

    console.log('\nStdout 👇\n')

    childProcess.stdout.on(
      'data',
      pipe(
        toString,
        console.log,
      ),
    )
    childProcess.stderr.on(
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
