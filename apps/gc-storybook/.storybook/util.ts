import { readdirSync } from 'fs';
import path from 'path';

const convertPathToPosix = (unformattedPath: string) =>
  unformattedPath.split(path.sep).join(path.posix.sep);

type GetRelativePathToDirectoryParams = {
  sourcePath: string;
  moduleName: string;
  directoryName: string;
};
export const getRelativePathToDirectory = ({
  sourcePath,
  moduleName,
  directoryName,
}: GetRelativePathToDirectoryParams) => {
  const relativePath = path.relative(
    sourcePath,
    path.join(require.resolve(moduleName), '../../src/lib', directoryName)
  );
  console.log('Relative path =>', relativePath);
  return convertPathToPosix(relativePath);
};
export const getStoriesConfigForMonorepoPackages = (
  packages: string[],
  sourcePath = __dirname
) =>
  packages.flatMap((moduleName) => {
    const pathToLibs = path.join(require.resolve(moduleName), '../../src/lib');

    console.log(pathToLibs);

    const allDirectories = readdirSync(pathToLibs, { withFileTypes: true })
      .filter((fileEntity) => fileEntity.isDirectory())
      .map((directoryEntity) => directoryEntity.name);

    console.log(allDirectories);

    return allDirectories.map((directoryName) => ({
      titlePrefix: moduleName,
      files: '**/*.stories.@(js|jsx|ts|tsx)',
      directory: getRelativePathToDirectory({
        sourcePath,
        moduleName,
        directoryName,
      }),
    }));
  });

export const getAliasesForMonorepoPackages = (packageNames: string[]) =>
  packageNames.reduce(
    (previous, moduleName) => ({
      ...previous,
      [moduleName]: path.join(
        require.resolve(moduleName),
        '../../src/index.ts'
      ),
    }),
    {}
  );
