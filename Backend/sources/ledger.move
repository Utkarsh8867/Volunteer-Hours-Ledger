module ledger::ledger {
    use std::signer;
    use std::vector;

    //
    // ---- Legacy Hours (kept exactly as required) ----
    //
    struct Hours has key {
        value: u64,
    }

    public entry fun add_hours(account: &signer, h: u64) acquires Hours {
        let addr = signer::address_of(account);
        if (!exists<Hours>(addr)) {
            move_to(account, Hours { value: h });
        } else {
            let hrs = borrow_global_mut<Hours>(addr);
            hrs.value = hrs.value + h;
        }
    }

    public fun get_hours(addr: address): u64 acquires Hours {
        if (exists<Hours>(addr)) {
            let h = borrow_global<Hours>(addr);
            h.value
        } else {
            0
        }
    }

    //
    // ---- New data types ----
    //

    /// A single volunteer entry (org + hours).
    /// Give it `copy` so we can return entries easily with `*vector::borrow(...)`.
    struct Entry has copy, drop, store {
        organisation: vector<u8>,
        hours: u64,
    }

    /// Student profile & their past entries
    struct Student has key {
        name: vector<u8>,
        age: u64,
        college: vector<u8>,
        entries: vector<Entry>,
    }

    //
    // ---- Write APIs ----
    //

    /// Register or update a student profile. Initializes empty entries if first time.
    public entry fun add_student(
        account: &signer,
        name: vector<u8>,
        age: u64,
        college: vector<u8>
    ) acquires Student {
        let addr = signer::address_of(account);
        if (!exists<Student>(addr)) {
            move_to(account, Student {
                name,
                age,
                college,
                entries: vector::empty<Entry>()
            });
        } else {
            let s = borrow_global_mut<Student>(addr);
            s.name = name;
            s.age = age;
            s.college = college;
        }
    }

    /// Append a new volunteer entry
    public entry fun add_entry(
        account: &signer,
        organisation: vector<u8>,
        hours: u64
    ) acquires Student {
        let addr = signer::address_of(account);
        // Must have a student profile first
        assert!(exists<Student>(addr), 100);
        let s = borrow_global_mut<Student>(addr);
        vector::push_back(&mut s.entries, Entry { organisation, hours });
    }

    //
    // ---- Read APIs ----
    //

    /// Get the student profile
    public fun get_student(addr: address): (vector<u8>, u64, vector<u8>) acquires Student {
        if (exists<Student>(addr)) {
            let s = borrow_global<Student>(addr);
            (s.name, s.age, s.college)
        } else {
            (b"", 0, b"")
        }
    }

    /// Total number of entries (for client-side iteration)
    public fun get_entries_len(addr: address): u64 acquires Student {
        if (exists<Student>(addr)) {
            let s = borrow_global<Student>(addr);
            vector::length(&s.entries)
        } else {
            0
        }
    }

    /// Get the i-th entry (0 <= i < len). Returns an Entry struct directly.
    /// If student doesn't exist or i is out of range, returns a default empty entry.
    public fun get_entry_at(addr: address, i: u64): Entry acquires Student {
        if (exists<Student>(addr)) {
            let s = borrow_global<Student>(addr);
            let len = vector::length(&s.entries);
            if (i < len) {
                // Entry has `copy`, so we can deref the borrowed ref to return a value.
                *vector::borrow(&s.entries, i)
            } else {
                Entry { organisation: b"", hours: 0 }
            }
        } else {
            Entry { organisation: b"", hours: 0 }
        }
    }
}
