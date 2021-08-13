import React from 'react';

import { Link, Heading } from '../Primitives';

function HomePage() {
  return (
    <>
      <Heading as="h1" variant="display">
        The Photon and Neutron Open Science Cloud
      </Heading>
      <p>
        The PaNOSC project brings together six strategic European research
        infrastructures and two e-infrastructures:
      </p>
      <ul>
        <li>
          <Link href="https://www.esrf.eu/" blank>
            European Synchrotron Radiation Facility
          </Link>
        </li>
        <li>
          <Link href="https://www.ceric-eric.eu/" blank>
            Central European Research Infrastructure Consortium
          </Link>
        </li>
        <li>
          <Link href="https://eli-laser.eu/" blank>
            Extreme Light Infrastructure Delivery Consortium
          </Link>
        </li>
        <li>
          <Link href="https://europeanspallationsource.se/" blank>
            European Spallation Source
          </Link>
        </li>
        <li>
          <Link href="https://www.xfel.eu/" blank>
            European X-Ray Free-Electron Laser Facility
          </Link>
        </li>
        <li>
          <Link href="https://www.ill.eu/" blank>
            Institut Laue Langevin
          </Link>
        </li>
        <li>
          <Link href="https://www.egi.eu/" blank>
            European Grid Infrastructure
          </Link>
        </li>
        <li>
          <Link href="https://www.geant.org/" blank>
            GÉANT
          </Link>
        </li>
      </ul>
      <p>
        The mission is to contribute to the realization of a data commons for
        Neutron and Photon science, providing services and tools for data
        storage, analysis and simulation, for the many scientists from existing
        and future disciplines using data from photon and neutron sources. To
        achieve this aim, the exchange of know-how and experiences is crucial to
        driving a change in culture by embracing Open Science among the targeted
        scientific communities. This is why the project works closely with the
        national photon and neutron sources in Europe to develop common
        policies, strategies and solutions in the area of FAIR data policy, data
        management and data services.
      </p>
    </>
  );
}

export default HomePage;
