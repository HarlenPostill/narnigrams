// src/components/stats/StatCard.jsx
import { Card, CardBody, Stat, StatLabel, StatNumber } from '@chakra-ui/react';

const StatCard = ({ label, value }) => {
  return (
    <Card>
      <CardBody>
        <Stat>
          <StatLabel>{label}</StatLabel>
          <StatNumber>{value}</StatNumber>
        </Stat>
      </CardBody>
    </Card>
  );
};

export default StatCard;
