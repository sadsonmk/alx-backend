#!/usr/bin/env python3
"""This is a module wich implements the LIFO caching system and inherits
    from the BaseCaching class
"""

BaseCaching = __import__('base_caching').BaseCaching


class LIFOCache(BaseCaching):
    """This is a clss which implements the LIFO caching inheriting from
        BaseCaching class
    """

    def __init__(self):
        """initializes the basecaching dictionary"""
        super().__init__()

    def put(self, key, item):
        """assigns to the dictionary self.cache_data
            the item value for the key key
        """
        if key is None or item is None:
            return

        size = len(self.cache_data)

        if  size >= BaseCaching.MAX_ITEMS:
            popped = list(self.cache_data.keys())[-1]
            print(f"DISCARD: {popped}")
            del self.cache_data[popped]
        self.cache_data[key] = item

    def get(self, key):
        """returns the value in self.cache_data linked to key"""
        if key is None or self.cache_data.get(key) is None:
            return None
        return self.cache_data.get(key)
