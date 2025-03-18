import React, { useState, useCallback } from 'react';
import { ButtonCont, PickJobTypeCont, Content, CardContainer } from './PickJobTypeModal.styles';
import Button from '../../../../shared/components/Button/Button';
import JobTypeCard from '../JobTypeCard/JobTypeCard';
import { IOption } from '../../../../shared/types/common.types';
import { inventoryServices } from '../../../../shared/services/inventoryServices';
import { ICreateInventoryItemPayload } from '../../../../shared/types/inventory.types';
import CreateMoveJobModal from '../CreateJobModal/CreateMoveJobModal/CreateMoveJobModal';
import BasicModal from '../../../../shared/components/Modals/BasicModal/BasicModal';

interface Props {
  onSubmit: (set: boolean) => void;
  jobTypeCallBack: (jobType: string) => void;
}

const CreateInventoryItemModal: React.FC<Props> = ({ onSubmit, jobTypeCallBack }) => {
  const [typePicked, settypePicked] = useState(false);
  const [jobType, setJobType] = useState<string>();

  const onClickTypeCard = useCallback((type: string) => {
    setJobType(type);
    settypePicked(true);
  }, []);

  return (
    <PickJobTypeCont>
      <CardContainer>
        <Content>
          <JobTypeCard
            type={'Pick & Pack'}
            picked={jobType}
            setJobType={onClickTypeCard}
            imageSource={'/packages.png'}
          />
          <JobTypeCard type={'Move'} picked={jobType} setJobType={onClickTypeCard} imageSource={'/worker.png'} />
        </Content>
      </CardContainer>

      <ButtonCont>
        <Button
          disabled={!typePicked}
          type="button"
          variant={'solid'}
          text={'Create Job'}
          color={'success'}
          onClick={() => {
            jobTypeCallBack(jobType || '');
            onSubmit(true);
          }}
        />
      </ButtonCont>
    </PickJobTypeCont>
  );
};

export default CreateInventoryItemModal;
