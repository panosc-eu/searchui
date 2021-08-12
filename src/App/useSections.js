/* Originally this hook did way less and was nice and clean,
 * not sure I still like it but does the job */

import React, { Suspense, useState, useEffect } from 'react';

import ErrorBoundary from '../App/errorBoundary';
import Spinner from '../App/spinner';
import { useNavigationStore, useAppStore } from '../App/stores';
import { Box, Heading } from '../Primitives';

const useSections = (sections, main) => {
  const mainComponent = main ?? 0;

  const [isShowing, setIsShowing] = useState({
    index: mainComponent,
    name: sections[mainComponent].name,
  });

  const setSections = useNavigationStore((state) => state.setSections);
  const isDesktop = useAppStore((state) => state.isDesktop);

  useEffect(() => {
    const sectionsObj = sections.map((section, index) => ({
      key: index,
      //indicates whether section is being shown
      active: isShowing.name === section.name,
      //whether is shown as default on page view
      main: mainComponent === index,
      name: section.name,
      onClick: () => setIsShowing({ index, name: section.name }),
    }));

    setSections(sectionsObj);
  }, [sections, mainComponent, setSections, isShowing]);

  const Arrange = () =>
    sections.map((section, index) => {
      return (
        (index === isShowing.index || isDesktop) && (
          <Box
            key={index}
            width={section.width ?? [1, 1, 1 / 3]}
            name={section.name}
            height="inherit"
          >
            <ErrorBoundary>
              <Suspense fallback={<Spinner />}>
                <Box height="inherit">
                  {section.hideTitle || (
                    <Heading variant="display">{section.name}</Heading>
                  )}
                  {section.component}
                </Box>
              </Suspense>
            </ErrorBoundary>
          </Box>
        )
      );
    });

  return { Arrange, isShowing };
};

export default useSections;

/* HOW TO USE THIS
 * This one should have a storybook :/
 *
  const sectionsArray = [
	  {
		  name: 'component name',
		  component: <Component />,

		//Keys bellow are optional, see defaults
		//array of widths, each key corresnponds to a breakpoint
		  width: [1, 1, 1/3],
		//whether title for component should be automatically rendered
		  hideTitle:  false,
	  }, {...}, {...}
  ]

  const {Arrange, isShowing} = useSections(sectionsArray, mainSectionKey)

  console.log(`which component is currently being shown ${isShowing}`)


  return <Arrange />

*/
