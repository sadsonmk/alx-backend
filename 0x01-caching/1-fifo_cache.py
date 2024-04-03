#!/usr/bin/env python3
"""This is a module for a class LIFOCache that inherits
    from BaseCaching and is a caching system
"""
BaseCaching = __import__('base_caching').BaseCaching


class FIFOCache(BaseCaching):
    """This is a class that inherits from
        BaseCaching and is a caching system
    """

    def __init__(self):
        """initializes the attributes for the FIFOCache objects"""
        super().__init__()

    def put(self, key, item):
        """assigns to the dictionary self.cache_data
            the item value for the key key
        """
        if key is None or item is None:
            return
        self.cache_data[key] = item

        if len(self.cache_data) > BaseCaching.MAX_ITEMS:
            value = next(iter(self.cache_data))
            self.cache_data.pop(value)
            print(f"DISCARD: {value}")

    def get(self, key):
        """This gets the value in self.cache_data linked to key"""
        if key is None or self.cache_data.get(key) is None:
            return None
        return self.cache_data.get(key)
