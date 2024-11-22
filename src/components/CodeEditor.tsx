import { useState } from 'react';

export default function CodeEditor() {
  const [code, setCode] = useState(`def maxSubArray(nums):
    max_sum = float('-inf')
    for i in range(len(nums)):
        current_sum = 0
        for j in range(i, len(nums)):
            current_sum += nums[j]`);

  return (
    <div className="bg-gray-900 p-4">
      <div className="font-mono text-sm">
        {code.split('\n').map((line, index) => (
          <div key={index} className="flex">
            <span className="text-gray-500 w-8 text-right mr-4">{index + 1}</span>
            <span className="text-white">{line}</span>
          </div>
        ))}
      </div>
    </div>
  );
}