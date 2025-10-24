CREATE TABLE shaders.shader_entries (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(100),
    code TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    last_modified TIMESTAMP DEFAULT NOW()
);