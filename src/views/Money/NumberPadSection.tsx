import styled from 'styled-components';
import React from 'react';
import { generateOutput } from './NumberPadSection/generateOutput';
import { useState } from 'react';
const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  > .output {
    background: #fff;
    font-size: 36px;
    line-height: 72px;
    text-align: right;
    padding: 0 16px;
    box-shadow: inset 0 -5px 5px -5px rgba(0, 0, 0, 0.25),
      inset 0 5px 5px -5px rgba(0, 0, 0, 0.25);
  }
  > .pad {
    > button {
      float: left;
      width: 25%;
      height: 64px;
      font-size: 18px;
      border: none;
      &.ok {
        height: 128px;
        float: right;
      }
      &.dot {
        /* width: 50%; */
      }
      &.zero {
        width: 50%;
      }
      &:nth-child(1) {
        background-color: #f2f2f2;
      }
      &:nth-child(2),
      &:nth-child(5) {
        background-color: #e0e0e0;
      }
      &:nth-child(3),
      &:nth-child(6),
      &:nth-child(9) {
        background-color: #d3d3d3;
      }
      &:nth-child(4),
      &:nth-child(7),
      &:nth-child(10) {
        background-color: #c1c1c1;
      }
      &:nth-child(8),
      &:nth-child(11),
      &:nth-child(13) {
        background-color: #b8b8b8;
      }
      &:nth-child(12) {
        background-color: #a9a9a9;
      }
      &:nth-child(14) {
        background-color: #9a9a9a;
      }
    }
  }
`;
type Props = {
  value: number;
  onChange: (value: number) => void;
  onOk?: () => void;
};
export const NumberPadSection: React.FC<Props> = (props) => {
  const [output, _setOutput] = useState(props.value.toString());
  const setOutput = (output: string) => {
    let newOutput;
    if (output.length > 16) {
      newOutput = output.slice(0, 16);
    } else if (output.length === 0) {
      newOutput = '0';
    } else {
      newOutput = output;
    }
    _setOutput(newOutput);
    props.onChange(parseFloat(newOutput));
  };
  const onClickButtonWrapper = (e: React.MouseEvent) => {
    const text = (e.target as HTMLButtonElement).textContent;
    if (text === null) {
      return;
    }
    if (text === 'ok') {
      props.onOk && props.onOk();
      return;
    }

    if ('0123456789.'.split('').concat('删除', '清空').indexOf(text) >= 0) {
      setOutput(generateOutput(text, output));
    }
  };
  return (
    <Wrapper>
      <div className='output'>{output}</div>
      <div className='pad clearfix' onClick={onClickButtonWrapper}>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>删除</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>清空</button>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button className='ok'>ok</button>
        <button className='zero'>0</button>
        <button className='dot'>.</button>
      </div>
    </Wrapper>
  );
};
