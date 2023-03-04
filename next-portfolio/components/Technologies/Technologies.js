import React from "react";
import { DiFirebase, DiReact, DiZend } from "react-icons/di";
import {
  Section,
  SectionDivider,
  SectionText,
  SectionTitle,
} from "@/styles/GlobalComponents";
import {
  List,
  ListContainer,
  ListItem,
  ListParagraph,
  ListTitle,
} from "./TechnologiesStyles";

const Technologies = () => (
  <Section id='tech'>
    <br />
    <SectionDivider />
    <SectionTitle>Technologies</SectionTitle>
    <SectionText>
      Cillum officia cupidatat dolor ad ad esse in dolore in enim. In pariatur
      elit Lorem irure ullamco amet sint mollit ullamco. Aliqua ea enim ut irure
      pariatur ullamco proident tempor eiusmod in ut sint cupidatat.
    </SectionText>
    <List>
      <ListItem>
        <DiReact size="3rem" />
        <ListContainer>Front-End</ListContainer>
        <ListParagraph>
          Experience with <br />
          React.js
        </ListParagraph>
      </ListItem>
      <ListItem>
        <DiFirebase size="3rem" />
        <ListContainer>Back-End</ListContainer>
        <ListParagraph>
          Experience with <br />
          Node.js <br />
          Go <br />
        </ListParagraph>
      </ListItem>
      <ListItem>
        <DiZend size="3rem" />
        <ListContainer>UI/UX</ListContainer>
        <ListParagraph>
          Experience with <br />
          Figma
        </ListParagraph>
      </ListItem>
    </List>
  </Section>
);

export default Technologies;
