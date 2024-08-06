import React from 'react';
import styled from 'styled-components';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import EducationCard from '../Cards/EducationCard';
import { education } from '../../data/constants';
import EarthCanvas from '../Globe';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding: 0px 0px 60px 0px;
  @media (max-width: 960px) {
    padding: 0px;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1350px;
  padding: 40px 0px 0px 0px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const Title = styled.div`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 16px;
  }
`;

const TimelineSection = styled.div`
  width: 100%;
  max-width: 1000px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  @media (max-width: 660px) {
    align-items: end;
  }
`;
const DateStyle = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;
const Icon = styled.img`
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  @media (min-width: 768px) {
    width: 40px;
    height: 40px;
  }
  @media (min-width: 1170px) {
    width: 60px;
    height: 60px;
  }
   
`;

const Education = () => {
  return (
    <Container id="education">
      <Wrapper>
        <Title>Education</Title>
        <Desc>
          My education has been a journey of self-discovery and growth. My educational details are as follows.
        </Desc>
        <TimelineSection>
          <VerticalTimeline>
            {education.map((educationItem) => (
              <VerticalTimelineElement
                key={educationItem.id}
                date={<DateStyle>{educationItem.date}</DateStyle>}
                icon={<Icon src={educationItem.img} />}
                contentStyle={{
                  background: 'transparent',
                  boxShadow: 'none',
                  padding: 0,
                }}
                contentArrowStyle={{ borderRight: '7px solid transparent' }}
              >
                <EducationCard education={educationItem} />
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </TimelineSection>
        
      </Wrapper>
    </Container>
  );
};

export default Education;
