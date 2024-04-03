#!/usr/bin/env python3
"""This module implements the Most Recently Used
    Caching replacement algorithm
"""

BaseCaching = __import__('base_caching').BaseCaching


class MRUCache(BaseCaching):
    """The class which implements the Most Recently Used Caching replacement
    algorithm inheriting from the BaseCaching class
    """
    def __init__(self):
        """initializes the cache"""
        super().__init__()
        self.mru_order = []

    def put(self, key, item):
        """assign to the dictionary self.cache_data
            the item value for the key key
        """
        if key is None or item is None:
            return
        if key in self.cache_data:
            self.mru_order.remove(key)
        elif len(self.cache_data) >= BaseCaching.MAX_ITEMS:
            most_used_key = self.mru_order.pop()
            print(f"DISCARD: {most_used_key}")
            del self.cache_data[most_used_key]

        self.cache_data[key] = item
        self.mru_order.append(key)

    def get(self, key):
        """returns the value in self.cache_data linked to key"""
        if key is None or self.cache_data.get(key) is None:
            return None
        self.mru_order.remove(key)
        self.mru_order.append(key)
        return self.cache_data.get(key)
