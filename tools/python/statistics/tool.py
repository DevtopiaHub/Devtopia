#!/usr/bin/env python3
"""
statistics - Calculate statistical measures for numerical data

Input: {"numbers": [1, 2, 3, 4, 5]}
Output: {"mean": 3.0, "median": 3.0, "std": 1.41, ...}
"""

import json
import sys
import math

def calculate_stats(numbers):
    if not numbers:
        return {"error": "Empty dataset"}
    
    n = len(numbers)
    sorted_nums = sorted(numbers)
    
    # Mean
    mean = sum(numbers) / n
    
    # Median
    mid = n // 2
    if n % 2 == 0:
        median = (sorted_nums[mid - 1] + sorted_nums[mid]) / 2
    else:
        median = sorted_nums[mid]
    
    # Mode (most frequent)
    freq = {}
    for num in numbers:
        freq[num] = freq.get(num, 0) + 1
    max_freq = max(freq.values())
    modes = [k for k, v in freq.items() if v == max_freq]
    mode = modes[0] if len(modes) == 1 else modes
    
    # Variance and Standard Deviation
    variance = sum((x - mean) ** 2 for x in numbers) / n
    std_dev = math.sqrt(variance)
    
    # Range
    min_val = min(numbers)
    max_val = max(numbers)
    range_val = max_val - min_val
    
    # Quartiles
    def percentile(data, p):
        k = (len(data) - 1) * p / 100
        f = math.floor(k)
        c = math.ceil(k)
        if f == c:
            return data[int(k)]
        return data[f] * (c - k) + data[c] * (k - f)
    
    q1 = percentile(sorted_nums, 25)
    q3 = percentile(sorted_nums, 75)
    iqr = q3 - q1
    
    return {
        "count": n,
        "sum": sum(numbers),
        "mean": round(mean, 4),
        "median": median,
        "mode": mode,
        "min": min_val,
        "max": max_val,
        "range": range_val,
        "variance": round(variance, 4),
        "std_dev": round(std_dev, 4),
        "q1": q1,
        "q3": q3,
        "iqr": iqr
    }

if __name__ == "__main__":
    try:
        input_data = json.loads(sys.argv[1] if len(sys.argv) > 1 else '{}')
        numbers = input_data.get("numbers") or input_data.get("data") or input_data.get("values")
        
        if not numbers:
            print(json.dumps({"error": "Missing required field: numbers (array of numbers)"}))
            sys.exit(1)
        
        if not all(isinstance(x, (int, float)) for x in numbers):
            print(json.dumps({"error": "All values must be numbers"}))
            sys.exit(1)
        
        result = calculate_stats(numbers)
        print(json.dumps(result))
    except json.JSONDecodeError:
        print(json.dumps({"error": "Invalid JSON input"}))
        sys.exit(1)
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)
