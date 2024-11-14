import { beforeEach, afterEach, describe, test, vi, expect } from 'vitest';
import { debounce } from '../debounce';
import { formatDate } from '../formatDate';

describe('debounce 유틸리티 단위 테스트', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useFakeTimers();
  });
  /**
   * 테스트 케이스 : 지정된 시간이 지난 후 함수 호출하는지 확인
   */
  test(`특정 시간이 지난 후 함수가 호출된다.`, () => {
    // Arrange : 스파이 함수와 decoune 함수 생성
    const spy = vi.fn();
    const debounceFn = debounce(spy, 300);

    // Act : debounce 함수 호출 및 시간 진행
    debounceFn();
    vi.advanceTimersByTime(300);

    // Assert : 스파이 함수 호출되었는지 확인
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  /**
   * 테스트 케이스 : 연이어 호출 시 마지막 호출 함수만 호출되는지 확인
   */
  test(`연어이 호출해도 마지막 호출 기준으로 지정된 타이머 시간이 지난 경우에만 함수가 호출된다.`, () => {
    // Arrange : 스파이 함수와 debounce 함수 생성
    const spy = vi.fn();
    const debounceFn = debounce(spy, 300);

    // Act : 연이어서 debounce 함수 호출 및 시간 진행
    debounceFn();
    vi.advanceTimersByTime(200);
    debounceFn();
    vi.advanceTimersByTime(200);
    debounceFn();
    vi.advanceTimersByTime(300);
    debounceFn();
    vi.advanceTimersByTime(200);

    // Assert : 스파이 함수가 단 한번만 호출되었는지 확인
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith();
  });

  /**
   * 테스트 케이스 : 지정된 시간 전에 호출되지 않아야 한다.
   */
  test(`지정된 시간 전에 함수가 호출되지 않는다.`, () => {
    // Arrange : 스파이 함수와 debounce 함수 생성
    const spy = vi.fn();
    const debounceFn = debounce(spy, 300);

    // Act : debounce 함수 호출 및 시간 일부 진행
    debounceFn();
    vi.advanceTimersByTime(200);

    // Assert : 스파이 함수가 아직 호출되지 않았는지 확인
    expect(spy).not.toHaveBeenCalled();
  });
});

describe(`formatData 유틸리티 단위 테스트`, () => {
  /**
   * 테스트 케이스 : 단일 인자를 받아 가공 후 새 문자열을 반환하는지 확인한다.
   */
  test(`단일 인자를 전달 받아 문자열을 반환하는지 확인한다.`, () => {
    // Arrange : 테스트할 문자열 정의
    const str = '2024-10-25';

    // Act : formatDate 함수 호출
    const result = formatDate(str);

    // Assert : 결과가 예상한 문자열 타입인지 확인
    expect(typeof result).toEqual('string');
  });

  /**
   * 테스트 케이스 : 전달받은 인자가 현재 시간 기준 1분 미만인 경우, '방금 전'을 반환하는지 확인한다.
   */
  test(`전달받은 인자가 현재 시간 기준 1분이 지나지 않았다면 '방금 전' 문자열을 반환한다.`, () => {
    // Arrange : 테스트할 문자열 정의
    const date = new Date(Date.now() - 59 * 1000).toString();

    // Act : formatDate 함수 호출
    const result = formatDate(date);

    // Assert : '방금 전' 문자를 반환하는지 확인한다.
    expect(result).toBe('방금 전');
  });

  /**
   * 테스트 케이스 : 전달받은 인자가 현재 시간 기준 1분 경과 1시간이 지나지 않은 경우, 'N분 전'을 반환하는지 확인한다.
   */
  test(`전달받은 인자가 현재 시간 기준 1분 경과 1시간을 초과하지 않은 경우, 'N분 전' 문자열을 반환한다.`, () => {
    // Arrange : 테스트할 문자열 정의
    const date = new Date(Date.now() - 5 * 60 * 1000).toString();

    // Act : formatDate 함수 호출
    const result = formatDate(date);

    // Assert : '5분 전' 문자를 반환하는지 확인한다.
    expect(result).toBe('5분 전');
  });

  /**
   * 테스트 케이스 : 전달받은 인자가 현재 시간 기준 1시간 경과 24시간이 지나지 않은 경우, 'N시간 전'을 반환하는지 확인한다.
   */
  test(`전달받은 인자가 현재 시간 기준 1시간 경과 24시간을 초과하지 않은 경우, 'N시간 전' 문자열을 반환한다.`, () => {
    // Arrange : 테스트할 문자열 정의
    const date = new Date(Date.now() - 5 * 60 * 60 * 1000).toString();

    // Act : formatDate 함수 호출
    const result = formatDate(date);

    // Assert : '5시간 전' 문자를 반환하는지 확인한다.
    expect(result).toBe('5시간 전');
  });

  /**
   * 테스트 케이스 : 전달받은 인자가 현재 시간 기준 24시간 경과 7일 지나지 않은 경우, 'N일 전'을 반환하는지 확인한다.
   */
  test(`전달받은 인자가 현재 시간 기준 24시간 경과 7일을 초과하지 않은 경우, 'N일 전' 문자열을 반환한다.`, () => {
    // Arrange : 테스트할 문자열 정의
    const date = new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toString();

    // Act : formatDate 함수 호출
    const result = formatDate(date);

    // Assert : '6일 전' 문자를 반환하는지 확인한다.
    expect(result).toBe('6일 전');
  });

  /**
   * 테스트 케이스 : 전달받은 인자가 현재 시간 기준 7일 경과한 경우, 가공된 형식의 날짜 문자열을 반환하는지 확인한다.
   */
  test(`전달받은 인자가 현재 시간 기준 7일 경과한 경우, 가공된 형식(YYYY년 MM월 DD일)의 날짜 문자열을 반환한다.`, () => {
    // Arrange : 테스트할 문자열 정의
    const date = new Date(2024, 1, 8).toString();

    // Act : formatDate 함수 호출
    const result = formatDate(date);

    // Assert : 'YYYY년 MM월 DD일' 문자를 반환하는지 확인한다.
    expect(result).toBe('2024년 1월 8일');
  });
});
