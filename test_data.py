import pandas as pd

df = pd.read_csv(
    "data/diesease_data.csv",
    encoding="latin1"
)

print(df.head())
print(df.columns)