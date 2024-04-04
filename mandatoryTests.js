// import { expect } from 'chai'
import readExampleFiles from './tests/shared/readExampleFiles.js'
import validateStrict from '../csaf-validator-lib/validateStrict.js'
import * as mandatory from '../csaf-validator-lib/lib/mandatoryTests.js'
import * as optional from '../csaf-validator-lib/lib/optionalTests.js'
import * as informative from '../csaf-validator-lib/lib/informativeTests.js'
import * as informative_fine from '../csaf-validator-lib/lib/informativeTests_fine.js'
import { optionalTest_6_2_1 } from '../csaf-validator-lib/optionalTests.js'
import { csaf_2_0_strict } from './schemaTests.js'
const validExamples = await readExampleFiles(
    new URL('test-data', import.meta.url)
)

const tests = [
    optionalTest_6_2_1,
    ...Object.values(mandatory),
    ...Object.values(optional),
    ...Object.values(informative_fine),
    csaf_2_0_strict
]

const hight_cost_test = [informative.informativeTest_6_3_8]

const time_out_test = [informative.informativeTest_6_3_7,
    informative.informativeTest_6_3_6]
describe('verification-all', function () {
    describe('verification examples', function () {
        this.timeout(50000);
        for (const [title, validExample] of validExamples) {
            // console.log("title test size = " + tests.length);
            it(title, async function () {
                const startTime = new Date();
                const result = await validateStrict(tests, validExample)
                const endTime = new Date();
                const duration = endTime.getTime() - startTime.getTime();
                console.log(`Test ${title} execution time: ${duration}ms`);
                // console.log(JSON.stringify(result));
                // expect(result.errors.length).to.equal(0)
            })
        }

    })

    describe('S6.3.8 Spell check-- hight cost', function () {
        this.timeout(50000);
        for (const [title, validExample] of validExamples) {
            // console.log("title test size = " + tests.length);
            it(title, async function () {
                const result = await validateStrict(hight_cost_test, validExample)
                console.log(JSON.stringify(result));
                // expect(result.errors.length).to.equal(0)
            })
        }
    })

    describe('6.3.6 Use of non-self referencing URLs Failing to Resolve', function () {
        this.timeout(50000);
        for (const [title, validExample] of validExamples) {
            // console.log("title test size = " + tests.length);
            it(title, async function () {
                const result = await validateStrict(time_out_test, validExample)
                console.log(JSON.stringify(result));
                // expect(result.errors.length).to.equal(0)
            })
        }
    })
})

