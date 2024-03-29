#!/usr/bin/env python3
"""This is a module for a function named index_range
    that takes two integer arguments page and page_size
"""
from typing import Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """it takes two arguments and return a tuple of size two containing
    a start index and an end index corresponding to the range of indexes
    to return in a list for those particular pagination parameters.
    """
    value1 = (page - 1) * page_size
    value2 = page * page_size
    return (value1, value2)
