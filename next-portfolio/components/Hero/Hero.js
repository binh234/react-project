import React from 'react';

import { Section, SectionText, SectionTitle } from '@/styles/GlobalComponents';
import Button from '@/styles/GlobalComponents/Button';
import { LeftSection } from './HeroStyles';

const Hero = (props) => (
  <Section row nopadding>
    <LeftSection>
      <SectionTitle main center>
        Welcome To <br />
        My Personal Portfolio sdjfhjdsfhlsdkf
      </SectionTitle>
      <SectionText>
        Do minim consequat adipisicing sunt. Sit aute ipsum aliqua veniam Lorem adipisicing adipisicing ad ex ipsum reprehenderit. Quis qui non pariatur dolor enim.
      </SectionText>
      <Button onClick={() => {}}>Learn More</Button>
    </LeftSection>
  </Section>
);

export default Hero;