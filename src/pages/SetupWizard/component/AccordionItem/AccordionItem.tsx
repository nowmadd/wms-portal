import React, { useEffect, useState } from 'react';
import { Accordion, AccordionSummary, Typography, AccordionDetails, Divider, Box, Tooltip } from '@mui/material';
import Pill from '../../../../shared/components/Pill/Pill';
import InfoPanel from '../../../../shared/components/InfoPanel/InfoPanel';
import Button from '../../../../shared/components/Button/Button';
import { ButtonCont, Keyframes } from './AccordionItem.styles';
import YoutubeComponent from '../../../../shared/components/YoutubeComponent/YoutubeComponent';
import { useNavigate } from 'react-router-dom';
import { css, keyframes } from '@emotion/react';

interface Props {
  title: string;
  headerText: string;
  infoArr?: {
    title: string;
    description: string;
  }[];
  youtubeLink?: string;
  knowledgeBaseInfo: {
    link: string;
    title: string;
  };
  goto?: {
    link: string;
    title: string;
  };
  complete: boolean;
  skippable: boolean;
  onCompletion: VoidFunction;
  expanded: boolean;
  onClick: VoidFunction;
  disabled: boolean;
}

const AccordionItem: React.FC<Props> = ({
  title,
  headerText,
  infoArr,
  youtubeLink,
  knowledgeBaseInfo,
  goto: { link: goToLink, title: goToTitle } = { link: '', title: '' },
  complete,
  skippable,
  onCompletion,
  expanded,
  onClick,
  disabled,
}) => {
  const navigate = useNavigate();
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  const handleLinkClick = (link: string) => {
    //open new tab
    window.open(link, '_blank');
  };

  const handleGoTo = (link: string) => {
    navigate(link);
  };

  const handleTooltipClose = () => {
    setTooltipOpen(false);
  };

  const handlToolTipOpen = () => {
    if (tooltipOpen) return;
    setTooltipOpen(true);
    setTimeout(() => {
      setTooltipOpen(false);
    }, 2000);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (disabled) return handlToolTipOpen();
    e.stopPropagation();
    onClick();
  };

  const handleOnComplete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setIsCompleting(true);
    onCompletion();
  };

  return (
    <Accordion
      expanded={expanded}
      disableGutters
      sx={{
        background: 'transparent',
        border: 'none',
        boxShadow: 'none',
        '&:before': {
          content: 'none',
        },
      }}
    >
      <AccordionSummary
        onClick={handleClick}
        expandIcon={
          <Tooltip
            onClose={handleTooltipClose}
            open={tooltipOpen}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title="Please complete the previous steps first"
            arrow
          >
            <div>
              {tooltipOpen ? (
                <Keyframes>
                  <i className="bx bxs-chevron-down annim" style={{ fontSize: 20, marginLeft: 'auto' }}></i>
                </Keyframes>
              ) : (
                <div>
                  <i className="bx bxs-chevron-down" style={{ fontSize: 20, marginLeft: 'auto' }}></i>
                </div>
              )}
            </div>
          </Tooltip>
        }
        sx={{ justifyContent: 'space-between', width: '100%' }}
      >
        <Typography sx={{ flex: 1, fontWeight: 500, fontSize: 18 }}>{title}</Typography>
        {complete ? <Pill text="Complete" color="success" variant="round" /> : <React.Fragment />}
      </AccordionSummary>
      <AccordionDetails sx={{ gap: 2, display: 'flex', flexDirection: 'column' }}>
        <Typography
          sx={{
            whiteSpace: 'pre-line',
          }}
        >
          {headerText}
        </Typography>
        <Divider orientation="horizontal" sx={{ borderBlockStartWidth: 1 }} />

        {infoArr?.length ? (
          <Box display={'flex'} gap={'10px'} flexDirection={'column'}>
            {infoArr.map((info, index) => (
              <InfoPanel key={index} info={info.title + '\n\n' + info.description} color="primary" />
            ))}
          </Box>
        ) : (
          <React.Fragment />
        )}
        {/* Youtube player */}
        {youtubeLink ? <YoutubeComponent url={youtubeLink} /> : <React.Fragment />}
        <InfoPanel
          info={knowledgeBaseInfo.title}
          color="info"
          buttonText="KNOWLEDGE BASE"
          onButtonClick={() => handleLinkClick(knowledgeBaseInfo.link)}
          buttonWidth={200}
        />
        <ButtonCont>
          {!complete ? (
            <Button
              loading={isCompleting}
              onClick={(e) => handleOnComplete(e)}
              variant={'solid-thin'}
              text={'Mark as Complete' + (skippable ? ' / Skip' : '')}
              color={'success'}
              style={{ width: skippable ? 200 : 170 }}
            />
          ) : (
            <div />
          )}
          {goToLink ? (
            <Button
              onClick={() => handleGoTo(goToLink)}
              endIcon="bx bx-chevron-right"
              variant={'solid-thin'}
              text={goToTitle}
              color={'primary'}
            />
          ) : (
            <React.Fragment />
          )}
        </ButtonCont>
      </AccordionDetails>
    </Accordion>
  );
};

export default AccordionItem;
