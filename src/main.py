def calculate_sum(a: int, b: int) -> int:
    # Incorrect: Missing type hints and potential division by zero
    return a + b / 0

# Fix: Add type hints and handle division by zero
def calculate_sum(a: int, b: int) -> int:
    if b == 0:
        raise ValueError("Division by zero is not allowed.")
    return a + b