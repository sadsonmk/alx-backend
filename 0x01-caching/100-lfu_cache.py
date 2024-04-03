#!/usr/bin/env python3
"""This module implements the Least Frequently Used Caching
    replacement algorithm
"""

BaseCaching = __import__('base_caching').BaseCaching


class LFUCache(BaseCaching):
    """The class which implements the Least Frequently Used Caching
        replacement algorithm extending the BaseCaching class
    """
    def __init__(self):
        """initializes the LFUcache"""
        super().__init__()
        self.fq = {}
        self.least_order = {}

    def put(self, key, item):
        """assign to the dictionary self.cache_data
            the item value for the key key
        """
        if key is None or item is None:
            return
        if key in self.cache_data:
            self.fq[key] += 1
            self.least_order[key] = len(self.least_order)
        elif len(self.cache_data) >= BaseCaching.MAX_ITEMS:
            ks = [k for k, v in self.fq.items() if v == min(self.fq.values())]
            if len(ks) > 1:
                ky = min(ks, key=lambda k: self.least_order[k])
            else:
                ky = ks[0]
            print(f"DISCARD: {ky}")
            del self.cache_data[ky]
            del self.fq[ky]
            del self.least_order[ky]

        self.cache_data[key] = item
        self.fq[key] = 1
        self.least_order[key] = len(self.least_order)

    def get(self, key):
        """returns the value in self.cache_data linked to key"""
        if key is None or self.cache_data.get(key) is None:
            return None

        self.fq[key] += 1
        self.least_order[key] = len(self.least_order)
        return self.cache_data.get(key)
