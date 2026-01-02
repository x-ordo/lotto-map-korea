import sys

try:
    with open('data/기획재정부_온라인복권 판매점 주소_20250607.csv', 'rb') as f:
        content = f.read()
        print("--- EUC-KR ---")
        print(content[:500].decode('euc-kr', errors='replace'))
        print("\n--- CP949 ---")
        print(content[:500].decode('cp949', errors='replace'))
except Exception as e:
    print(e)
