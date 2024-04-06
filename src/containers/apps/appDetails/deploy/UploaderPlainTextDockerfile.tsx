import { ISoteriaDefinition } from '../../../../models/ISoteriaDefinition'
import UploaderPlainTextBase from './UploaderPlainTextBase'

export default class UploaderPlainTextDockerfile extends UploaderPlainTextBase {
    protected getPlaceHolderValue() {
        return `# Derived from official mysql image (our base image)
FROM mysql:5.7
# Add a database
ENV MYSQL_DATABASE company`
    }

    protected convertDataToSoteriaDefinition(userEnteredValue: string) {
        const capDefinition: ISoteriaDefinition = {
            schemaVersion: 2,
            dockerfileLines: userEnteredValue.trim().split('\n'),
        }

        return JSON.stringify(capDefinition)
    }
}
